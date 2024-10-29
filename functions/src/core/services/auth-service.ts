// src/core/services/auth-service.ts

import { getAuth } from 'firebase-admin/auth';

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
      const claims = { [key]: value };
      await getAuth().setCustomUserClaims(uid, claims);
    } catch (error) {
      // TODO handle error
    }
  }
}

export const authService = new AuthService();
