// src/core/data/models/lead-model.ts

import { Lead } from '../../lead';
import {
  validateLeadCountryCode,
  validateLeadEmail,
  validateLeadFirstName,
  validateLeadLastName,
  validateLeadPhone,
  validateLeadSignupReason,
  validateLeadStartDate,
  validateLeadSubscriptionType,
} from './validators';

export class LeadModel extends Lead {
  static kFirstName = 'firstName';
  static kLastName = 'lastName';
  static kEmail = 'email';
  static kPhone = 'phone';
  static kCountryCode = 'countryCode';
  static kStartDate = 'startDate';
  static kSignupReason = 'signupReason';
  static kSubscriptionType = 'subscriptionType';

  static fromEntity(entity: Lead): LeadModel {
    return Object.assign(LeadModel.empty(), entity);
  }

  static empty(): LeadModel {
    return new LeadModel('', '', '', '', '', null, '', null);
  }

  toBody() {
    return {
      [LeadModel.kFirstName]: this.firstName,
      [LeadModel.kLastName]: this.lastName,
      [LeadModel.kEmail]: this.email,
      [LeadModel.kPhone]: this.phone,
      [LeadModel.kCountryCode]: this.countryCode,
      [LeadModel.kStartDate]: this.startDate,
      [LeadModel.kSignupReason]: this.signupReason,
      [LeadModel.kSubscriptionType]: this.subscriptionType,
    };
  }

  static fromBody(body: any): LeadModel {
    validateLeadFirstName(body[LeadModel.kFirstName]);
    validateLeadLastName(body[LeadModel.kLastName]);
    validateLeadEmail(body[LeadModel.kEmail]);
    validateLeadPhone(body[LeadModel.kPhone]);
    validateLeadCountryCode(body[LeadModel.kCountryCode]);
    validateLeadStartDate(body[LeadModel.kStartDate]);
    validateLeadSignupReason(body[LeadModel.kSignupReason]);
    validateLeadSubscriptionType(body[LeadModel.kSubscriptionType]);

    return new LeadModel(
      body[LeadModel.kFirstName],
      body[LeadModel.kLastName],
      body[LeadModel.kEmail],
      body[LeadModel.kPhone],
      body[LeadModel.kCountryCode],
      body[LeadModel.kStartDate],
      body[LeadModel.kSignupReason],
      body[LeadModel.kSubscriptionType]
    );
  }
}
