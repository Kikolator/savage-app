// src/core/services/sendgrid-service.ts

import * as sgMail from '@sendgrid/mail';
import * as sgClient from '@sendgrid/client';
import * as admin from 'firebase-admin';
import { FirebaseSecrets } from '../utils/firebase-secrets';
import { logger } from 'firebase-functions/v2';
import { HttpResponseError } from '../utils/http-response-error';
import { ClientRequest } from '@sendgrid/client/src/request';
import { LeadClientModel } from '../data/models/lead/client/lead-client-model';
import { CustomField } from '../data/custom-field';
import { User } from '../data/user';
import { Subscription } from '../data/subscription';

// import { CustomFieldFirestoreModel } from '../data/models/
// custom - field / firestore / custom - field - firestore - model';
import { FieldValue } from 'firebase-admin/firestore';

interface ListObject {
  name: string;
  id: string;
}

interface ContactCustomFields {
  [key: string]: string | Date | number;
}

interface Contact {
  email: string;
  phone_number_id: string;
  external_id: string;
  first_name: string;
  last_name: string;
  custom_fields: ContactCustomFields;
}

interface RequestData {
  list_ids: string[];
  contact: Contact[];
}

export class SendgridService {
  private initialized = false;

  private collection() {
    return admin.firestore().collection('sendgrid');
  }

  // list IDs
  // private readonly _kLeadsListId = '848b96c6-1d98-45b5-9f82-56f257fe5416';
  //   private readonly kInactiveLeadsListId =
  //     '1a79b75b-cfb6-48fe-8023-d0ccbbe2e3ca';
  // private readonly kFormerMembersListId =
  //   '24644a79-977a-4a84-81b8-fd87114102c8';
  // private readonly _kGeneralNewsletterListId =
  //   '4d6a76f0-dfb8-4f6d-a9c7-5cf5496a88df';
  // private readonly kCurrentMembersListId =
  //   'b24dee5a-7f48-4743-9795-47f3415248ab';
  private readonly kLeadsList: ListObject = {
    name: 'leads',
    id: '2c37cc7e-ea48-4573-9c82-da7d9d62ab41',
  };
  private readonly kMembersList: ListObject = {
    name: 'members',
    id: 'ace131a3-a469-446d-9569-6027191902d0',
  };
  private readonly kNewsList: ListObject = {
    name: 'news',
    id: 'ef435fed-a6e9-453e-99bf-bf90c7cf97ff',
  };

  // Custom Field IDs
  private readonly _kStartDateCustomFieldId = 'e3_D';
  private readonly _kSignupReasonCustomFieldId = 'e5_T';
  private readonly kSubscriptionTypeFieldId = 'e4_T';
  private readonly kSubscriptionStatusFieldId = 'e6_T';

  private readonly kNewSubscriptionTemplateId =
    'd-012dbbb122d24494915ab59fcd214306';

  // initialize the Sendgrid API at runtime, only once.
  private initialize(): void {
    if (!this.initialized) {
      const sendgridApiKey = FirebaseSecrets.sendgridApiKey.value();
      // set the Sendgrid API key.
      sgMail.setApiKey(sendgridApiKey);
      sgClient.setApiKey(sendgridApiKey);
      // ensure we don't initialize again in future calls.
      this.initialized = true;
      logger.debug('SendgridService initialised');
    }
  }

  async updateContact(user: User): Promise<void> {
    try {
      this.initialize();
      logger.debug('updating sendgrid contact');
      const contacts: Contact[] = [];
      const listIds: string[] = [];
      const customFields: ContactCustomFields = {};

      if (user.membershipStatus != null) {
        customFields[this.kSubscriptionStatusFieldId] = user.membershipStatus;
        listIds.push(this.kMembersList.id);
      }

      if (user.newsletterSubscription) {
        listIds.push(this.kNewsList.id);
      }

      const contact: Contact = {
        email: user.signupEmail ?? '',
        phone_number_id: user.signupPhone ?? '',
        external_id: user.uid,
        first_name: user.firstName,
        last_name: user.lastName,
        custom_fields: customFields,
      };

      contacts.push(contact);

      const data: RequestData = {
        list_ids: listIds,
        contact: contacts,
      };
      const request: ClientRequest = {
        url: '/v3/marketing/contacts',
        method: 'PUT',
        body: data,
      };
      logger.debug(request);
      await sgClient.request(request);

      await this.collection().doc(user.uid).set({
        uid: user.uid,
        contact: contact,
        list_ids: listIds,
        date_time: FieldValue.serverTimestamp(),
      });
      return;
    } catch (error: unknown) {
      logger.error(
        `error on creating/updating sendgrid contact for User: ${user.uid}`,
        JSON.stringify(error)
      );
      throw new HttpResponseError(500, 'INTERNAL', 'unknown');
    }
  }

  async sendNewSubscriptionEmail(
    user: User,
    newSubscriptions: Subscription[]
  ): Promise<void> {
    // TODO write a function that sends a one-off email template when
    // subscription type is updated.
    for (const subscription of newSubscriptions) {
      const message: sgMail.MailDataRequired = {
        personalizations: [
          {
            to: [
              {
                email: user.signupEmail,
                name: `${user.firstName} ${user.lastName}`,
              },
            ],
            dynamicTemplateData: {
              user: {
                first_name: user.firstName,
              },
              subscription: {
                subscription_type: subscription.plan,
                start_date: subscription.startDate,
                auto_renew: subscription.autoRenew,
                billing_cycle: subscription.billingCycle,
              },
              date_format: 'dddd, D MMMM YYYY',
            },
          },
        ],
        from: {
          email: 'hub@savage-coworking.com',
          name: 'Savage Coworking',
        },
        templateId: this.kNewSubscriptionTemplateId,
      };
      logger.debug(message);
      logger.warn('Uncomment line for production');
      await sgMail.send(message);
    }
  }

  // TODO
  // async sendCancelledSubscriptionEmail(
  //   user: User,
  //   cancelledSubscriptions: string[]
  // ): Promise<void> {
  //   // TODO write a function that sends a one-off email template when
  //   // subscription type is updated.
  // }

  // private customFieldsCollection() {
  //   //TODO set app name to variable / Firebase has app name var?
  //   return this.collection().doc('savageApp').collection('customFields');
  // }

  // private customFieldDoc(customFieldId?: string) {
  //   if (!customFieldId) return this.customFieldsCollection().doc();
  //   return this.customFieldsCollection().doc(customFieldId);
  // }

  async getLists() {
    try {
      this.initialize();
      logger.debug('Getting Sendgrid lists');
      const queryParams = {
        page_size: 50,
      };

      const data: ClientRequest = {
        url: 'v3/marketing/lists',
        method: 'GET',
        qs: queryParams,
      };
      const [response, body]: [sgMail.ClientResponse, any] =
        await sgClient.request(data);
      if (response.statusCode == 200) {
        return body.result as [
          name: string,
          id: string,
          contactCount: number,
          meta: object
        ];
      } else {
        throw new HttpResponseError(response.statusCode);
      }
    } catch (error) {
      logger.error(error);
      if (error instanceof HttpResponseError) {
        throw error;
      }
      throw new HttpResponseError(500);
    }
  }

  async sendTestEmail() {
    this.initialize();
    logger.debug('Sending test email');
    const msg = {
      to: 'nicholaspijpers@icloud.com',
      from: 'hub@savage-coworking.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    try {
      await sgMail.send(msg);
      logger.debug('Email sent');
      return;
    } catch (error) {
      logger.error(error);
      throw new HttpResponseError(500);
    }
  }

  /** Adds a new contact to Sendgrid from a lead
   * #TODO handle if contact already exists.
   * #TODO create a SendgridContact class with lead to contact method.
   * Returns the status of the request 202 if in cue, or error.
   */
  async addLead(lead: LeadClientModel): Promise<void> {
    this.initialize();
    logger.debug('Adding lead');
    const listIds = [] as string[];
    const customFields = {} as { [key: string]: string | Date | number };

    // add Lead list
    listIds.push(this.kLeadsList.id);

    // add contact
    const contacts: { [key: string]: string | object }[] = [
      {
        email: lead.email,
        first_name: lead.firstName,
        last_name: lead.lastName,
        custom_fields: customFields,
      },
    ];
    if (lead.phone) {
      contacts[0].phone_number_id = lead.phone;
    }
    if (lead.startDate) {
      customFields[this._kStartDateCustomFieldId] = lead.startDate;
    }
    if (lead.subscriptionType) {
      customFields[this.kSubscriptionTypeFieldId] = lead.subscriptionType;
    }
    if (lead.signupReason) {
      customFields[this._kSignupReasonCustomFieldId] = lead.signupReason;
    }

    const data = {
      list_ids: listIds,
      contacts: contacts,
    };
    const request: ClientRequest = {
      url: '/v3/marketing/contacts',
      method: 'put',
      body: data,
    };

    try {
      // logger.debug(request);
      await sgClient.request(request);
      return;
    } catch (error) {
      logger.error(error);
      throw new HttpResponseError(500);
    }
  }

  /** Adds contact to list
   * Takes two args, contact id and list id
   */
  async addContactToList(contactId: string, listId: string) {
    this.initialize();
    logger.debug('Adding contact to list');
    logger.debug(contactId, listId);
    // Add contact to list
    logger.error('addContactToList not implemented');
    throw new HttpResponseError(500);
  }

  /** Gets the custom fields and reserved fields from Sendgrid.
   * return value contains custom_fields[] and served_fields[]
   */
  async getCustomFields() {
    this.initialize();
    const request: ClientRequest = {
      url: '/v3/marketing/field_definitions',
      method: 'GET',
    };
    const [response] = await sgClient.request(request);
    if (response.statusCode != 200) {
      logger.error(
        'Error getting custom fields',
        `Sendgrid status code: ${response.statusCode}`,
        `response body: ${JSON.stringify(response.body)}`
      );
      throw new HttpResponseError(500);
    }
    return response.body;
  }

  /** Creates a Custom field in Sendgrid
   * for names use lowercase and underscore.
   * returns CustomField with id.
   */
  async createCustomField(customField: CustomField): Promise<CustomField> {
    this.initialize();
    // Set custom field to Sendgrid

    const data = {
      name: customField.name,
      field_type: customField.fieldType,
    };

    const request: ClientRequest = {
      url: '/v3/marketing/field_definitions',
      method: 'POST',
      body: data,
    };
    try {
      const [response]: [sgMail.ClientResponse, unknown] =
        await sgClient.request(request);
      if (response.statusCode != 200) {
        throw new HttpResponseError(500, 'INTERNAL', 'unknown error');
      }

      // const newCustomField = customField.copyWith({ id: body.result.id });

      // // Add custom field to Firestore
      // const docRef = this.customFieldDoc(newCustomField.id);
      // await docRef.set(
      //   CustomFieldFirestoreModel.fromEntitiy(newCustomField).toDocumentData(
      //     undefined,
      //     FieldValue.serverTimestamp()
      //   )
      // );

      return customField;
    } catch (error: any) {
      logger.error(
        'Error creating custom field',
        `error: ${JSON.stringify(error.message)}`
      );
      throw new HttpResponseError(400, 'BAD_REQUEST', error.message);
    }
  }
}

export const sendgridService = new SendgridService();
