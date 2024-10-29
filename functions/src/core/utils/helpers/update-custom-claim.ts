// src/core/utils/helpers/membership-status-update.ts

import { getAuth } from 'firebase-admin/auth';

/**
 * Membership status can be active or inactive
 * The claim to be updated is {client: boolean}
 */
export async function updateCustomClaim(
  uid: string,
  key: string,
  value: boolean
): Promise<void> {
  try {
    const claims = { [key]: value };
    await getAuth().setCustomUserClaims(uid, claims);
  } catch (error) {
    // TODO handle error
  }
}
