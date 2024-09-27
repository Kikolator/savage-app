import { Lead } from '../models/lead_model';

/**
 * Class to handle lead related operations.
 *  - functions:
 *      - createLead:
 *      - A webhook that takes data from a web form.
 *      - Verifies source and data.
 *      - Add data to Database.
 *      - Add data to message service "SendGrid".
 *      - Send notification to "admin" user.
 */
export class LeadService {
  static async createLead(leadData: Lead): Promise<Lead> {
    const newLead = { ...leadData, id: Date.now().toString() }; // Placeholder logic

    //TODO verify source
    //TODO verify data
    //TODO add data to database
    //TODO add data to sendgrid
    //TODO send notification to admin.

    return newLead;
  }
}
