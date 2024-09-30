// src/api/controllers/root_controllers/root_controller.ts

import { RequestHandler } from 'express';
import { Controller, HttpServer } from '../index';
import { FirebaseSecrets } from '../../../core/utils/firebase-secrets';

let counter: number = 1;

export class RootController implements Controller {
  initialize(httpServer: HttpServer): void {
    httpServer.get('/', this.root.bind(this));
    httpServer.get(
      '/test-key',
      this.api.bind(this),
      [],
      FirebaseSecrets.appApiKey
    );
  }

  private readonly root: RequestHandler = async (req, res, next) => {
    res.send({ status: `API is working! counter: ${counter++}` });
    next();
  };

  private readonly api: RequestHandler = async (req, res, next) => {
    res.send({ status: `API key is valid! counter: ${counter++}` });
    next();
  };
}
