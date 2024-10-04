// src/core/services/lead-service.ts
import * as admin from 'firebase-admin';
import { Lead } from '../data/lead';
import { LeadFirestoreModel } from '../data/models/lead/firestore/lead-firestore-model';

export class LeadService {
  private collection() {
    return admin.firestore().collection('leads');
  }

  private doc(leadId?: string) {
    if (!leadId) return this.collection().doc();
    return this.collection().doc(leadId);
  }

  async getLead(leadId: string): Promise<Lead | null> {
    const leadResponse = await this.doc(leadId).get();
    if (!leadResponse.exists) return null;
    return LeadFirestoreModel.fromDocumentData(leadResponse.data);
  }

  async checkContactDataExists(
    phone?: string,
    email?: string
  ): Promise<boolean> {
    //TODO Write function to check if email and/or phone already exist in other lead.
    throw new Error('Function not implemented.');
  }
}
