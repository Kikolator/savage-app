import { CloudFunction } from 'firebase-functions/lib/v2';

export type EventTriggerV2Function = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: CloudFunction<any>;
};

export type AddEventTrigger = (params: EventTriggerV2Function) => void;

export interface InitializeEventTriggers {
  initialize(add: AddEventTrigger): void;
}
