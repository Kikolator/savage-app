import { defineSecret } from 'firebase-functions/params';

export class FirebaseSecrets {
  static readonly appApiKey = defineSecret('SAVAGE_API_KEY');
  static readonly sendgridApiKey = defineSecret('SENDGRID_API_KEY');
}
