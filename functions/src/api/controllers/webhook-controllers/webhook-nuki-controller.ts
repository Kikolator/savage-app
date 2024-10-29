import { RequestHandler } from 'express';
import { Controller, HttpServer } from '..';
import { FirebaseSecrets } from '../../../core/utils/firebase-secrets';

export class NukiWebhookController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.get(
      '/webhook/nuki',
      this.pingNuki.bind(this),
      ['client'],
      FirebaseSecrets.appApiKey
    );
  }

  private readonly pingNuki: RequestHandler = async (req, res) => {
    res.send('pong');
  };
}
