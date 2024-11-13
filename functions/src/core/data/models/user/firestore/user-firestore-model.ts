// src/core/data/models/user/firestore/user-firestore-model.ts

import { DocumentData, Timestamp } from 'firebase-admin/firestore';
import { User } from '../../../user';

/**
 *     // Unique user identifier
    public readonly uid: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly signupEmail: string | null,
    public readonly signupPhone: string | null,
    public readonly dateOfBirth: Date | null,
    public readonly photoUrl: string | null,
    // status of membership (null is new user)
    public readonly membershipStatus: 'active' | 'inactive' | null,
    // List with membership ids
    public readonly membershipIds: Array<string>,
    // Date joined
    public readonly joinedAt: Date,
    // unique identifier of the public member object
    public readonly memberDataId: string | null,
    // boolean to indicate if user requests invoice
    public readonly requestInvoice: boolean,
    // An array with invoice data
    public readonly invoiceData: Array<InvoiceData>,
    // If user is checked in at coworking space
    public readonly checkedIn: boolean,
    // The id of Sendgrid contact
    public readonly sendgridId: string | null,
    // If user receives email notifications
    public readonly emailNotifications: boolean,
    // If user receives newsletters
    public readonly newsletterSubscription: boolean
 */
export class UserFirestoreModel extends User {
  static kUid = 'uid';
  static kFirstName = 'first_name';
  static kLastName = 'last_name';
  static kSignupEmail = 'signup_email';
  static kSignupPhone = 'signup_phone';
  static kWhatsappPhone = 'whatsapp_phone';
  static kDateOfBirth = 'date_of_birth';
  static kPhotoUrl = 'photo_url';
  static kMembershipStatus = 'membership_status';
  static kMembershipIds = 'membership_ids';
  static kJoinedAt = 'joined_at';
  static kMemberDataId = 'member_data_id';
  static kRequestInvoice = 'request_invoice';
  static kInvoiceData = 'invoice_data';
  static kCheckedIn = 'checked_in';
  static kSendgridId = 'sendgrid_id';
  static kEmailNotifications = 'email_notifications';
  static kNewsletterSubscription = 'newsletter_subscription';

  static fromEntity(entity: User): UserFirestoreModel {
    return Object.assign(UserFirestoreModel.empty(), entity);
  }

  static empty(): UserFirestoreModel {
    return new UserFirestoreModel(
      '',
      '',
      '',
      null,
      null,
      null,
      new Date(),
      null,
      null,
      [],
      new Date(),
      '',
      false,
      [],
      false,
      null,
      false,
      false
    );
  }

  static fromDocumentData(data: DocumentData): UserFirestoreModel {
    return new UserFirestoreModel(
      data[UserFirestoreModel.kUid],
      data[UserFirestoreModel.kFirstName],
      data[UserFirestoreModel.kLastName],
      data[UserFirestoreModel.kSignupEmail],
      data[UserFirestoreModel.kSignupPhone],
      data[UserFirestoreModel.kWhatsappPhone],
      (data[UserFirestoreModel.kDateOfBirth] as Timestamp).toDate(),
      data[UserFirestoreModel.kPhotoUrl],
      data[UserFirestoreModel.kMembershipStatus],
      data[UserFirestoreModel.kMembershipIds],
      (data[UserFirestoreModel.kJoinedAt] as Timestamp).toDate(),
      data[UserFirestoreModel.kMemberDataId],
      data[UserFirestoreModel.kRequestInvoice],
      data[UserFirestoreModel.kInvoiceData],
      data[UserFirestoreModel.kCheckedIn],
      data[UserFirestoreModel.kSendgridId],
      data[UserFirestoreModel.kEmailNotifications],
      data[UserFirestoreModel.kNewsletterSubscription]
    );
  }
}
