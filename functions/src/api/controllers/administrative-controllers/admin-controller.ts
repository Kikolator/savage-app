// src/api/controllers/administrative-controllers/admin-controller.ts

import { RequestHandler } from 'express';
import { Controller, HttpServer } from '..';
import { FirebaseSecrets } from '../../../core/utils/firebase-secrets';

export class AdminController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.post(
      '/new-lead',
      this.createNewLead.bind(this),
      [],
      FirebaseSecrets.appApiKey
    );
  }

  private readonly createNewLead: RequestHandler = (req, res, next) => {
    //
  };
}
