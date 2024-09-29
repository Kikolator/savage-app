// src/api/index.ts
import * as express from 'express';
import { getControllers } from './controllers/controllers';
import { HttpServer } from './controllers';
import { interceptors } from './middleware';

const apiApp: express.Express = express();
const httpServer = new HttpServer(apiApp);

for (let i = 0; i < interceptors.length; i++) {
  apiApp.use(interceptors[i]);
}

getControllers().forEach((controller) => {
  controller.initialize(httpServer);
});

export { apiApp };
