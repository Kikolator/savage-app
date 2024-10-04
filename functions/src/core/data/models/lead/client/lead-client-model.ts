// src/core/data/models/lead-model.ts

import { SubscriptionType } from '../../../../..';
import { Lead } from '../../../lead';
import {
  validateLeadEmail,
  validateLeadFirstName,
  validateLeadLastName,
  validateLeadOrigin,
  validateLeadSubscriptionType,
} from '../validators';

export class LeadClientModel extends Lead {
  static kLeadId = 'leadId';
  static kCreatedAtMilisecondsSinceEpoch = 'createdAtMillisecondsSinceEpoch';
  static kOrigin = 'origin';
  static kFirstName = 'firstName';
  static kLastName = 'lastName';
  static kEmail = 'email';
  static kPhone = 'phone';
  static kCountryCode = 'countryCode';
  static kStartDateMillisecondsSinceEpoch = 'startDateMillisecondsSinceEpoch';
  static kSignupReason = 'signupReason';
  static kSubscriptionType = 'subscriptionType';

  static fromEntity(lead: Lead): LeadClientModel {
    return Object.assign(LeadClientModel.empty(), lead);
  }

  static empty(): LeadClientModel {
    return new LeadClientModel(
      '',
      new Date(),
      '',
      '',
      '',
      '',
      '',
      new Date(),
      '',
      '' as SubscriptionType,
      '',
      []
    );
  }

  private static _validate(body: any): void {
    validateLeadFirstName(body[LeadClientModel.kFirstName]);
    validateLeadLastName(body[LeadClientModel.kLastName]);
    validateLeadEmail(body[LeadClientModel.kEmail]);
    validateLeadOrigin(body[LeadClientModel.kOrigin]);
    validateLeadSubscriptionType(body[LeadClientModel.kSubscriptionType]);
  }

  static validateBody(body: any): LeadClientModel {
    this._validate(body);
    return new LeadClientModel(
      undefined,
      new Date(),
      body[LeadClientModel.kOrigin],
      body[LeadClientModel.kFirstName],
      body[LeadClientModel.kLastName],
      body[LeadClientModel.kEmail],
      body[LeadClientModel.kPhone],
      body[LeadClientModel.kStartDateMillisecondsSinceEpoch],
      body[LeadClientModel.kSignupReason],
      body[LeadClientModel.kSubscriptionType],
      undefined,
      undefined
    );
  }
}
