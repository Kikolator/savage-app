// src/core/services/sendgrid-service.ts

import * as sgMail from '@sendgrid/mail';
import * as sgClient from '@sendgrid/client';
// import * as admin from 'firebase-admin';
import { FirebaseSecrets } from '../utils/firebase-secrets';
import { logger } from 'firebase-functions/v2';
import { HttpResponseError } from '../utils/http-response-error';
import { ClientRequest } from '@sendgrid/client/src/request';
import { LeadClientModel } from '../data/models/lead/client/lead-client-model';
import { CustomField } from '../data/custom-field';
import { CustomFieldClientModel } from '../data/models/custom-field/client/custom-field-client-model';

export class SendgridService {
  private initialized: boolean = false;

  // list IDs
  readonly kLeadsListId = '848b96c6-1d98-45b5-9f82-56f257fe5416';
  //   private readonly kInactiveLeadsListId =
  //     '1a79b75b-cfb6-48fe-8023-d0ccbbe2e3ca';
  //   private readonly kFormerMembersListId =
  //     '24644a79-977a-4a84-81b8-fd87114102c8';
  //   private readonly kGeneralNewsletterListId =
  //     '4d6a76f0-dfb8-4f6d-a9c7-5cf5496a88df';
  //   private readonly kCurrentMembers = 'b24dee5a-7f48-4743-9795-47f3415248ab';

  // initialize the Sendgrid API at runtime, only once.
  private initialize(): void {
    if (!this.initialized) {
      const sendgridApiKey = FirebaseSecrets.sendgridApiKey.value();
      // set the Sendgrid API key.
      sgMail.setApiKey(sendgridApiKey);
      sgClient.setApiKey(sendgridApiKey);
      this.initialized = true; // ensure we don't initialize again in future calls.
    }
  }

  // private collection() {
  //   return admin.firestore().collection('sendgrid');
  // }

  // private customFieldsCollection() {
  //   return this.collection().doc('savageApp').collection('customFields');
  // }

  // private customFieldsDoc(leadId?: string) {
  //   if (!leadId) return this.customFieldsCollection().doc();
  //   return this.customFieldsCollection().doc(leadId);
  // }

  async getLists() {
    this.initialize();

    const queryParams = {
      page_size: 50,
    };

    const data: ClientRequest = {
      url: 'v3/marketing/lists',
      method: 'GET',
      qs: queryParams,
    };

    try {
      const [response, body]: [sgMail.ClientResponse, any] =
        await sgClient.request(data);
      if (response.statusCode == 200) {
        return body.result as [
          name: string,
          id: string,
          contactCount: number,
          meta: any
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

  /** Adds a new contact to Sendgrid
   * #TODO handle if contact already exists.
   * Returns the status of the request 202 if in cue, or error.
   */
  async addContact(lead: LeadClientModel): Promise<string> {
    // Add lead to sendgrid as a contact
    throw new Error('Function not implemented.');
  }

  /** Adds contact to list
   * Takes two args, contact id and list id
   */
  async addContactToList(contactId: string, listId: string) {
    // Add contact to list
  }

  /** Gets the custom fields and reserved fields from Sendgrid.
   * return value contains custom_fields[] and served_fields[]
   */
  async getCustomFields() {
    this.initialize();
    const request: ClientRequest = {
      url: `/v3/marketing/field_definitions`,
      method: 'GET',
    };
    const [response, _] = await sgClient.request(request);
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
  async createCustomField(newCustomField: CustomField): Promise<CustomField> {
    this.initialize();

    const data = {
      name: newCustomField.name,
      field_type: newCustomField.fieldType,
    };

    const request: ClientRequest = {
      url: `/v3/marketing/field_definitions`,
      method: 'POST',
      body: data,
    };
    const [response, body]: [sgMail.ClientResponse, any] =
      await sgClient.request(request);
    if (response.statusCode != 200) {
      logger.error(
        'Error creating custom field',
        `Sendgrid status code: ${response.statusCode}`,
        `response body: ${JSON.stringify(response.body)}`
      );
      throw new HttpResponseError(500);
    }
    const customField: CustomField = CustomFieldClientModel.validate(body);

    return customField;
  }
}

export const sendgridService = new SendgridService();
