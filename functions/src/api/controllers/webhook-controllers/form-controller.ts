// src/api/controllers/webhook-controllers/form-controller.ts

import { RequestHandler } from 'express';
import { Controller, HttpServer } from '..';
import { logger } from 'firebase-functions/v2';
import { leadService } from '../../../core/services/lead-service';

type Field = {
  id: string;
  value: string;
};

type MetaData = {
  page_url?: string;
  user_agent?: string;
  ip?: string;
  submission_time?: string;
};

interface ElementorPayload {
  fields: { [key: string]: Field };
  meta?: MetaData;
}

export class FormController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.get('/webhook/trial-day-form', this.trialDayForm.bind(this));
  }

  private readonly trialDayForm: RequestHandler = async (req, res) => {
    // request get data
    // Extract form fields
    const payload = req.body as ElementorPayload;
    const fields = payload.fields;
    logger.debug(fields);
    const name = fields['name']?.value || 'No name provided';
    const email = fields['email']?.value || 'No email provided';
    const phone = fields['phone']?.value || 'No phone provided';
    const date = new Date(fields['date']?.value);

    // Access meta data if available
    const meta = payload.meta || {};
    const pageUrl = meta.page_url || 'No URL provided';
    const userAgent = meta.user_agent || 'No user agent provided';
    const ip = meta.ip || 'No IP provided';
    const submissionTime =
      meta.submission_time || 'No submission time provided';

    // Add date to database
    leadService.addTrialDayLead(name, email, phone, date, {
      pageUrl,
      userAgent,
      ip,
      submissionTime,
    });

    // TODO add contact to sendgrid
    // sendgridService
    // send free trial day confirmation email
    // respond succes
    // .res
    //   .status(200)
    //   .send();
  };
}
