// src/controllers/controllers.ts

import { AdminController } from './administrative-controllers/admin-controller';
import { Controller } from './index';
import { RootController } from './root-controllers/root-controller';

export const getControllers = (): Array<Controller> => [
  new RootController(),
  new AdminController(),
];
