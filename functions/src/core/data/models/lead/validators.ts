// src/core/data/models/lead/validators.ts

import { HttpResponseError } from '../../../utils/http-response-error';
import { validateEmail } from '../../../utils/validators';

export function validateLeadFirstName(firstName: string) {
  if (!firstName?.length)
    throw new HttpResponseError(400, 'BAD_REQUEST', 'invalid "first name"');
}

export function validateLeadLastName(lastName: string) {
  if (!lastName?.length)
    throw new HttpResponseError(400, 'BAD_REQUEST', 'invalid "last name"');
}

export function validateLeadEmail(email: string) {
  if (!validateEmail(email))
    throw new HttpResponseError(400, 'BAD_REQUEST', 'invalid "email"');
}

export function validateLeadPhone(phone: string) {
  if (!phone?.length)
    throw new HttpResponseError(400, 'BAD_REQUEST', 'invalid "phone"');
}

export function validateLeadCountryCode(countryCode: string) {
  if (!countryCode?.length)
    throw new HttpResponseError(400, 'BAD_REQUEST', 'invalid "country code"');
}

export function validateLeadStartDate(startDateSinceEpoch: number) {
  if (!startDateSinceEpoch)
    throw new HttpResponseError(
      400,
      'BAD_REQUEST',
      'invalid "start date timestamp"'
    );
}

export function validateLeadSignupReason(reason: string) {
  if (!reason?.length)
    throw new HttpResponseError(400, 'BAD_REQUEST', 'invalid "signup reason"');
}

export function validateLeadSubscriptionType(type: string) {
  if (
    type != 'allstar' &&
    type != 'nomad' &&
    type != 'explorer' &&
    type != 'weektripper' &&
    type != 'daytripper' &&
    type != 'socialiser' &&
    type != 'connector' &&
    type != 'checkpoint'
  )
    throw new HttpResponseError(
      400,
      'BAD_REQUEST',
      'invalid "subscription type", neither "allstar" nor "nomad" nor "explorer" nor "weektripper" nor "daytripper" nor "socialiser" nor "connector" nor "checkpoint"'
    );
}
