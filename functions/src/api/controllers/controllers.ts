// src/controllers/controllers.ts

import { AdminController } from './administrative-controllers/admin-controller';
import { Controller } from './index';
import { RootController } from './root-controllers/root-controller';
import { FormController } from './webhook-controllers/form-controller';
// eslint-disable-next-line max-len
import { NukiWebhookController } from './webhook-controllers/webhook-nuki-controller';

export const getControllers = (): Array<Controller> => [
  new RootController(),
  new AdminController(),
  new NukiWebhookController(),
  new FormController(),
];
