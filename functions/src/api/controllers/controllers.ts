// src/controllers/controllers.ts

import { Controller } from './index';
import { RootController } from './root-controllers/root-controller';

export const getControllers = (): Array<Controller> => [new RootController()];
