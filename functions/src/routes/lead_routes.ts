import * as functions from 'firebase-functions';
import { LeadController } from '../controllers/lead_controller';

export const createLead = functions.https.onRequest(LeadController.createLead);
