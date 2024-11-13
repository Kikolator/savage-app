import { SubscriptionFunctions } from './functions/subscription-functions';
import { InitializeCallableFunctions } from './initialize-callable-functions';

/** TODO: Add your v2 functions handlers here */
const callableFunctionList: Array<InitializeCallableFunctions> = [
  new SubscriptionFunctions(),
];

export function callableFunctions(): { [key: string]: any } {
  const res: { [key: string]: any } = {};
  for (const v2 of callableFunctionList) {
    v2.initialize((params) => {
      res[params.name] = params.handler;
    });
  }
  return res;
}
