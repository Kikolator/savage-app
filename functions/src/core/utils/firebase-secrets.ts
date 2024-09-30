import { defineSecret } from 'firebase-functions/params';

export class FirebaseSecrets {
  static readonly appApiKey = defineSecret('SAVAGE_API_KEY');
}
