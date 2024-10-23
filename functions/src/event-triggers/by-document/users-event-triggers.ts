// src/event-triggers/by-document/users-event-triggers.ts

import { onDocumentCreated } from 'firebase-functions/firestore';
import {
  AddEventTrigger,
  EventTriggerV2Function,
  InitializeEventTriggers,
} from '../initialize-event-triggers';

export class UsersEventTriggers implements InitializeEventTriggers {
  initialize(add: AddEventTrigger): void {
    add(this.onCreated);
  }

  private readonly onCreated: EventTriggerV2Function = {
    name: 'onUSerCreated',
    handler: onDocumentCreated('users/{userId}', async (document) => {
      const user = UserFirestoreModel.fromDocumentData(document.data?.data());
      const record = new DbChangedRecord(
        'USER_CREATED',
        `User ${user.firstName} ${user.lastName} has been created`,
        user.uid
      );
      await dbChangedService.addRecord(record);
    }),
  };
}
