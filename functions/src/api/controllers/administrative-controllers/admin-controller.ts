// src/api/controllers/administrative-controllers/admin-controller.ts

import { RequestHandler } from 'express';
import { Controller, HttpServer } from '..';
import { FirebaseSecrets } from '../../../core/utils/firebase-secrets';
import { sendgridService } from '../../../core/services/sendgrid-service';
// eslint-disable-next-line max-len
import { LeadClientModel } from '../../../core/data/models/lead/client/lead-client-model';
import {
  CustomFieldClientModel,
  // eslint-disable-next-line max-len
} from '../../../core/data/models/custom-field/client/custom-field-client-model';
import { logger } from 'firebase-functions/v2';

export class AdminController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post(
      '/new-lead',
      this.createNewLead.bind(this),
      [],
      FirebaseSecrets.appApiKey
    );
    httpServer.get(
      '/mailclient-lists',
      this.getMailClientLists.bind(this),
      [],
      FirebaseSecrets.appApiKey
    );
    httpServer.get(
      '/mailclient-customfields',
      this.getMailClientCustomFields.bind(this),
      [],
      FirebaseSecrets.appApiKey
    );
    httpServer.post(
      '/mailclient-add-customfield',
      this.postMailClientAddCustomField,
      [],
      FirebaseSecrets.appApiKey
    );
  }
  /** Takes leadModel as a body, requires API auth in header
   * Add/update lead to db
   * Add/update lead as contact to Sendgrid
   * Add contact to Leads list in Sendgrid
   * add lead/list to firestore Sendgrid collection.
   * Notifies admin new lead was generated.
   */
  private readonly createNewLead: RequestHandler = async (req, res, next) => {
    // validate body
    const lead = LeadClientModel.validateBody(req.body);
    // Add lead to db
    // TODO
    // Add new lead as a contact to sendgrid and to Leads list
    await sendgridService.addContact(lead);
    res
      .status(200)
      .send('Contact added succesfully, check Sendgrid status for updates');
    next();
  };

  private readonly getMailClientLists: RequestHandler = async (
    req,
    res,
    next
  ) => {
    const lists = await sendgridService.getLists();
    res.status(200).send(lists);
    next();
  };

  private readonly getMailClientCustomFields: RequestHandler = async (
    req,
    res,
    next
  ) => {
    const customFields = await sendgridService.getCustomFields();
    res.status(200).send(customFields);
    next();
  };

  private readonly postMailClientAddCustomField: RequestHandler = async (
    req,
    res,
    next
  ) => {
    logger.debug(req.body);
    const newCustomField = CustomFieldClientModel.validate(req.body);
    await sendgridService.createCustomField(newCustomField);
    res.status(200).send('custom field added succesfully');
    next();
  };
}
