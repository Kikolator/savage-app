import { Request, Response } from 'firebase-functions';
import { LeadService } from '../services/lead_service';

/**
 * The Controller class for lead related functions.
 * functions:
 *  - createLead: Acts as a webhook, takes lead data and handles appropiatly.
 */
export class LeadController {
  static async createLead(req: Request, res: Response): Promise<void> {
    try {
      const newLead = LeadService.createLead(req.body);
      res.status(201).send({
        success: true,
        lead: newLead,
      });
    } catch (error) {
      //TODO log error.
      res.status(500).send({
        success: false,
        errorCode: 'internal',
        errorMessage: 'Something went wrong...',
      });
    }
  }
}
