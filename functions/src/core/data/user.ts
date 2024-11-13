// src/core/data/user.ts

import { InvoiceData } from './invoice-data';

export class User {
  constructor(
    // Unique user identifier
    public readonly uid: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly signupEmail: string,
    // phone number used for signin
    public readonly signupPhone: string | null,
    // Phone used for whatsapp
    public readonly whatsappPhone: string | null,
    public readonly dateOfBirth: Date,
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
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyWith(data: Partial<Record<keyof User, any>>) {
    return new User(
      data.uid ?? this.uid,
      data.firstName ?? this.firstName,
      data.lastName ?? this.lastName,
      data.dateOfBirth ?? this.dateOfBirth,
      data.signupEmail ?? this.signupEmail,
      data.signupPhone ?? this.signupPhone,
      data.whatsappPhone ?? this.whatsappPhone,
      data.photoUrl ?? this.photoUrl,
      data.membershipStatus ?? this.membershipStatus,
      data.membershipIds ?? this.membershipIds,
      data.joinedAt ?? this.joinedAt,
      data.memberDataId ?? this.memberDataId,
      data.requestInvoice ?? this.requestInvoice,
      data.invoiceData ?? this.invoiceData,
      data.checkedIn ?? this.checkedIn,
      data.sendgridId ?? this.sendgridId,
      data.emailNotifications ?? this.emailNotifications,
      data.newsletterSubscription ?? this.newsletterSubscription
    );
  }
}
