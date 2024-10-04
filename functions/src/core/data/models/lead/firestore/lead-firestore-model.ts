// src/core/data/models/lead/firestore/lead-firestore-model.ts

import { DocumentData, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { SubscriptionType } from '../../../../..';
import { Lead } from '../../../lead';

export class LeadFirestoreModel extends Lead {
  static kLeadId = 'leadId';
  static kCreatedAt = 'createdAt';
  static kOrigin = 'origin';
  static kFirstName = 'firstName';
  static kLastName = 'lastName';
  static kEmail = 'email';
  static kPhone = 'phone';
  static kStartDate = 'startDate';
  static kSignupReason = 'signupReason';
  static kSubscriptionType = 'subscriptionType';

  static fromEntity(lead?: Lead): LeadFirestoreModel | null {
    if (lead == null) return null;
    return Object.assign(LeadFirestoreModel.empty(), lead);
  }

  static empty(): LeadFirestoreModel {
    return new LeadFirestoreModel(
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

  toDocumentData(leadId?: string, createdAt?: Timestamp | FieldValue) {
    return {
      [LeadFirestoreModel.kLeadId]: leadId ?? this.leadId,
      [LeadFirestoreModel.kCreatedAt]: createdAt ?? this.createdAt,
      [LeadFirestoreModel.kFirstName]: this.firstName,
      [LeadFirestoreModel.kLastName]: this.lastName,
      [LeadFirestoreModel.kEmail]: this.email,
      [LeadFirestoreModel.kPhone]: this.phone,
      [LeadFirestoreModel.kStartDate]: this.startDate,
      [LeadFirestoreModel.kSignupReason]: this.signupReason,
      [LeadFirestoreModel.kSubscriptionType]: this.subscriptionType,
      [LeadFirestoreModel.kOrigin]: this.origin,
    };
  }

  static fromDocumentData(data: DocumentData) {
    return new LeadFirestoreModel(
      data[LeadFirestoreModel.kLeadId],
      (data[LeadFirestoreModel.kCreatedAt] as Timestamp).toDate(),
      data[LeadFirestoreModel.kOrigin],
      data[LeadFirestoreModel.kFirstName],
      data[LeadFirestoreModel.kLastName],
      data[LeadFirestoreModel.kEmail],
      data[LeadFirestoreModel.kPhone],
      data[LeadFirestoreModel.kStartDate].toDate(),
      data[LeadFirestoreModel.kSignupReason],
      data[LeadFirestoreModel.kSubscriptionType],
      undefined,
      undefined
    );
  }
}
