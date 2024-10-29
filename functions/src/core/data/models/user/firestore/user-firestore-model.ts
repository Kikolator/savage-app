// src/core/data/models/user/firestore/user-firestore-model.ts

import { DocumentData, Timestamp } from 'firebase-admin/firestore';
import { User } from '../../../user';

export class UserFirestoreModel extends User {
  static kUid = 'uid';
  static kFirstName = 'first_name';
  static kLastName = 'last_name';
  static kContactEmail = 'contact_email';
  static kContactPhone = 'contact_phone';
  static kSignupEmail = 'signup_email';
  static kSignupPhone = 'signup_phone';
  static kDateOfBirth = 'date_of_birth';
  static kPhotoUrl = 'photo_url';
  static kMembershipStatus = 'membership_status';
  static kMembershipTypes = 'membership_types';
  static kAvailableCredits = 'available_credits';
  static kJoinedAt = 'joined_at';
  static kMemberDataId = 'member_data_id';
  static kRequestInvoice = 'request_invoice';
  static kInvoiceData = 'invoice_data';
  static kCheckedIn = 'checked_in';
  static kSendgridId = 'sendgrid_id';
  static kEmailNotifications = 'email_notifications';

  static fromEntity(entity: User): UserFirestoreModel {
    return Object.assign(UserFirestoreModel.empty(), entity);
  }

  static empty(): UserFirestoreModel {
    return new UserFirestoreModel(
      '',
      '',
      '',
      '',
      '',
      null,
      null,
      null,
      null,
      '',
      [],
      null,
      new Date(),
      null,
      false,
      {},
      false,
      null,
      false
    );
  }

  static fromDocumentData(data: DocumentData): UserFirestoreModel {
    return new UserFirestoreModel(
      data[UserFirestoreModel.kUid],
      data[UserFirestoreModel.kFirstName],
      data[UserFirestoreModel.kLastName],
      data[UserFirestoreModel.kContactEmail],
      data[UserFirestoreModel.kContactPhone],
      data[UserFirestoreModel.kSignupEmail],
      data[UserFirestoreModel.kSignupPhone],
      data[UserFirestoreModel.kDateOfBirth] !== null
        ? (data[UserFirestoreModel.kDateOfBirth] as Timestamp).toDate()
        : null,
      data[UserFirestoreModel.kPhotoUrl],
      data[UserFirestoreModel.kMembershipStatus],
      data[UserFirestoreModel.kMembershipTypes],
      data[UserFirestoreModel.kAvailableCredits],
      data[UserFirestoreModel.kJoinedAt],
      data[UserFirestoreModel.kMemberDataId],
      data[UserFirestoreModel.kRequestInvoice],
      data[UserFirestoreModel.kInvoiceData],
      data[UserFirestoreModel.kCheckedIn],
      data[UserFirestoreModel.kSendgridId],
      data[UserFirestoreModel.kEmailNotifications]
    );
  }
}
