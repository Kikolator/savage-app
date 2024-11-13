import { onCall } from 'firebase-functions/https';
import {
  AddCallableFunction,
  CallableV2Function,
  InitializeCallableFunctions,
} from '../initialize-callable-functions';
import { logger } from 'firebase-functions/v2';

export class SubscriptionFunctions implements InitializeCallableFunctions {
  initialize(add: AddCallableFunction): void {
    add(this.createSubscription);
  }

  private readonly createSubscription: CallableV2Function = {
    name: 'createSubscription',
    handler: onCall({ region: 'europe-west3' }, (request) => {
      logger.debug('creating subscription');
      // Check caller is admin
      const isAdmin: boolean | undefined = request.auth?.token.admin;
      logger.debug(`caller is admin: ${isAdmin}`);
      return;
    }),
  };
}
