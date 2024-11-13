// src/core/services/auth-service.ts

import { getAuth } from 'firebase-admin/auth';
import { logger } from 'firebase-functions/v2';

class AuthService {
  // A service wrapper for the Firebase Auth package

  /**
   * Updates a custom claim for a user with uid.
   * Custom claims need a key and a boolean value.
   * Don't use claims to pass data as they are passed on every call.
   */
  async updateCustomClaim(
    uid: string,
    key: string,
    value: boolean
  ): Promise<void> {
    try {
      logger.debug('updating custom claim');
      // get current claims
      let claims = (await getAuth().getUser(uid)).customClaims;
      logger.debug('current claims: ', claims);
      // add/update new claim
      if (claims == undefined) {
        logger.debug('claims is undefined');
        claims = { [key]: value };
      } else {
        claims[key] = value;
      }
      logger.debug('claims to update: ', claims);
      await getAuth().setCustomUserClaims(uid, claims);
    } catch (error) {
      // TODO handle error
      logger.error(error);
    }
  }
}

export const authService = new AuthService();
