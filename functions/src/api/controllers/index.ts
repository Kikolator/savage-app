// src/api/controllers/index.ts

import {
  Express,
  RequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  ErrorResponseBody,
  HttpResponseError,
} from '../../core/utils/http-response-error';
import { logger } from 'firebase-functions';
import { MyClaims } from '../..';
import { defineSecret } from 'firebase-functions/params';
import { SecretParam } from 'firebase-functions/lib/params/types';

export interface Controller {
  initialize(httpServer: HttpServer): void;
}

export class HttpServer {
  constructor(public readonly express: Express) {}

  get(
    path: string,
    requestHandler: RequestHandler,
    claims?: MyClaims[],
    apiKey?: SecretParam
  ): void {
    this.express.get(
      path,
      this._catchErrorHandler(requestHandler, claims, apiKey)
    );
  }

  post(
    path: string,
    requestHandler: RequestHandler,

    claims?: MyClaims[],
    apiKey?: SecretParam
  ): void {
    this.express.post(
      path,
      this._catchErrorHandler(requestHandler, claims, apiKey)
    );
  }

  delete(
    path: string,
    requestHandler: RequestHandler,

    claims?: MyClaims[],
    apiKey?: SecretParam
  ): void {
    this.express.delete(
      path,
      this._catchErrorHandler(requestHandler, claims, apiKey)
    );
  }

  put(
    path: string,
    requestHandler: RequestHandler,
    claims?: MyClaims[],
    apiKey?: SecretParam
  ): void {
    this.express.put(
      path,
      this._catchErrorHandler(requestHandler, claims, apiKey)
    );
  }

  private _catchErrorHandler(
    requestHandler: RequestHandler,
    claims?: MyClaims[],
    apiKey?: SecretParam
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const checkClaims = () => {
        if (claims?.length) {
          for (let claim of claims) {
            if ((req.auth?.customClaims ?? {})[claim]) {
              return;
            }
            if ((req.claims ?? {})[claim]) {
              return;
            }
          }
          throw new HttpResponseError(
            403,
            'FORBIDDEN',
            !req.auth
              ? `Requires authentication`
              : `Only ${claims
                  .toString()
                  .replace(/,/g, ', ')} can perform this operation`
          );
        }
      };

      const checkApiKey = () => {
        if (apiKey) {
          // check provided api key from header with secret server key.
          // key in header is set on express Request.apiKey
          const apiHeaderValue = req.apiKey;

          if (apiHeaderValue == defineSecret('SAVAGE_API_KEY').value()) {
            return;
          }

          throw new HttpResponseError(403, 'Unauthorized', 'Invalid API key');
        }
      };

      try {
        checkClaims();
        checkApiKey();
        await Promise.resolve(requestHandler(req, res, next));
      } catch (error) {
        const userInfo = !req.auth?.uid?.length ? '' : `uid: ${req.auth.uid}`;

        if (error instanceof HttpResponseError) {
          const errorMessage = `[${req.method.toUpperCase()}] ${
            req.path
          }${userInfo}`;
          if (error.status >= 500) {
            logger.error(errorMessage);
          } else {
            logger.warn(errorMessage);
          }
          res.statusCode = error.status;
          res.send(
            new ErrorResponseBody({
              status: error.status,
              code: error.code,
              description: error.description,
            })
          );
          next();
          return;
        }
        logger.error(`[${req.method.toUpperCase()}] ${req.path}${userInfo}`);
        logger.error(error);
        res.statusCode = 500;
        res.send(
          new ErrorResponseBody({
            status: 500,
            code: 'INTERNAL_ERROR',
            description: 'An internal error occurred, please contact support',
          })
        );
        next();
      }
    };
  }
}
