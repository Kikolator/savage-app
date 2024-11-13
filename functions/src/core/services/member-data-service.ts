import * as admin from 'firebase-admin';
// eslint-disable-next-line max-len
import { MemberDataFirestoreModel } from '../data/models/member-data/firestore/member-data-firestore-model';

class MemberDataService {
  private collection() {
    return admin.firestore().collection('member_data');
  }

  private doc(memberDataId?: string) {
    if (!memberDataId) return this.collection().doc();
    return this.collection().doc(memberDataId);
  }

  async updateStatus(id: string, status: 'active' | 'inactive') {
    await this.doc(id).update({
      [MemberDataFirestoreModel.kMembershipStatus]: status,
    });
  }
}

export const memberDataService = new MemberDataService();
