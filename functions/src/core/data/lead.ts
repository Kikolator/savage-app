// src/core/data/user.ts

import { SubscriptionType } from '../..';

/**
 * The Lead interface represents an incoming lead for a coworking
 * management platform. This model is used to store and process the details
 * of potential clients or users who express interest in the platform or
 * services offered.
 *
 * Fields:
 * - firstName: The first name of the lead.
 * - lastName: The last name of the lead.
 * - email: The lead's email address. This will be used for communication.
 * - phone: The lead's phone number for direct contact.
 * - countryCode: The country code associated with the lead's phone number,
 *   useful for international contact (e.g., 'US' for United States).
 * - startDate: The date when the lead is interested in starting or engaging. When null the lead did not set a starting date.
 * with the service.
 * - why: A short description explaining the lead's reason for interest,
 * or what they are looking for.
 * - subscriptionType: The id of the subscription they are enquiring for,
 * or where the form was filled in from. When null, the lead did not express interest in a certain subscription.
 * - createdAt: Date object in UTC for when lead was created.
 */
export class Lead {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly countryCode: string,
    public readonly startDate: Date | null,
    public readonly signupReason: string,
    public readonly subscriptionType: SubscriptionType | null
  ) {}

  copyWith(data: Partial<Record<keyof Lead, any>>) {
    return new Lead(
      data.firstName ?? this.firstName,
      data.lastName ?? this.lastName,
      data.email ?? this.email,
      data.phone ?? this.phone,
      data.countryCode ?? this.countryCode,
      data.startDate ?? this.startDate,
      data.signupReason ?? this.signupReason,
      data.subscriptionType ?? this.subscriptionType
    );
  }
}
