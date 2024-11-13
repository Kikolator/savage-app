// src/core/services/user-service.ts
// import * as admin from 'firebase-admin';
// import { User } from '../data/user';
// import { Subscription } from '../data/subscription';

class UserService {
  //   private collection() {
  //     return admin.firestore().collection('users');
  //   }
  //   private doc(uid?: string) {
  //     if (!uid) return this.collection().doc();
  //     return this.collection().doc(uid);
  //   }
  // eslint-disable-next-line max-len
  // async newSubscription(user: User, subscription: Subscription): Promise<void> {
  //   // Add subscription to user
  // }
  //   async updateMembershipTypes(
  //     user: User,
  //     newSubscriptions: Subscription[],
  //     cancelledSubscriptions: Subscription[]
  //   ): Promise<void> {
  //     // update sendgrid contact
  //     await sendgridService.updateContact(user);
  //     // send one-off confirmation email, subscription is udpated.
  //     await sendgridService.sendNewSubscriptionEmail(user, newSubscriptions);
  //     await sendgridService.sendCancelledSubscriptionEmail(
  //       user,
  //       cancelledSubscriptions
  //     );
  //   }
}

export const userService: UserService = new UserService();
