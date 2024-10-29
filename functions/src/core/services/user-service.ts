// src/core/services/user-service.ts
// import * as admin from 'firebase-admin';
import { authService } from './auth-service';

class UserService {
  //   private collection() {
  //     return admin.firestore().collection('users');
  //   }

  //   private doc(uid?: string) {
  //     if (!uid) return this.collection().doc();
  //     return this.collection().doc(uid);
  //   }

  async updateMembershipStatus(uid: string, status: string) {
    // Update Custom Claim
    await authService.updateCustomClaim(uid, 'client', status === 'active');

    // UpdateSendgrid Contact
    // Update Sendgrid List
  }
}

export const userService: UserService = new UserService();
