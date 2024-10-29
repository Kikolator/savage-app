import { InitializeEventTriggers } from './initialize-event-triggers';
import { UsersEventTriggers } from './by-document/users-event-triggers';

/** TODO: Add your v2 functions handlers here */
const eventTriggerList: Array<InitializeEventTriggers> = [
  new UsersEventTriggers(),
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
