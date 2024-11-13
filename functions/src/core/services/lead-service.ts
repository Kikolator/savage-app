// src/core/services/lead-service.ts
import * as admin from 'firebase-admin';
import { Lead } from '../data/lead';
// eslint-disable-next-line max-len
import { LeadFirestoreModel } from '../data/models/lead/firestore/lead-firestore-model';
import { logger } from 'firebase-functions/v2';

class LeadService {
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
    // TODO Write function to check if email
    // and or phone already exist in other lead.
    logger.debug(phone, email);
    throw new Error('Function not implemented.');
  }

  async addTrialDayLead(
    name: string,
    email: string,
    phone: string,
    date: Date,
    meta: object
  ): Promise<void> {
    // Add to database
    const docRef = this.collection().doc();
    await docRef.set({
      id: docRef.id,
      name: name,
      email: email,
      phone: phone,
      date: date,
      meta: meta,
    });
  }
}

export const leadService = new LeadService();
