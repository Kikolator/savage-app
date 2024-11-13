import { InitializeEventTriggers } from './initialize-event-triggers';
import { UsersEventTriggers } from './by-document/users-event-triggers';
// eslint-disable-next-line max-len
import { SubscriptionEventTriggers } from './by-document/subscriptions-event-triggers';

/** TODO: Add your v2 functions handlers here */
const eventTriggerList: Array<InitializeEventTriggers> = [
  new UsersEventTriggers(),
  new SubscriptionEventTriggers(),
];

export function eventTriggers(): { [key: string]: any } {
  const res: { [key: string]: any } = {};
  for (const v2 of eventTriggerList) {
    v2.initialize((params) => {
      res[params.name] = params.handler;
    });
  }
  return res;
}
