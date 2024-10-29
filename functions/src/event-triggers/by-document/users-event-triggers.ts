// src/event-triggers/by-document/users-event-triggers.ts

import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/firestore';
import {
  AddEventTrigger,
  EventTriggerV2Function,
  InitializeEventTriggers,
} from '../initialize-event-triggers';

// eslint-disable-next-line max-len
import { UserFirestoreModel } from '../../core/data/models/user/firestore/user-firestore-model';
import { DbChangedRecord } from '../../core/data/db-changed-record';
import { dbChangesService } from '../../core/services/db-changes-service';
import { updateCustomClaim } from '../../core/utils/helpers';
import { userService } from '../../core/services/user-service';

export class UsersEventTriggers implements InitializeEventTriggers {
  initialize(add: AddEventTrigger): void {
    add(this.onCreated);
    add(this.onChanged);
  }

  private readonly onCreated: EventTriggerV2Function = {
    name: 'onUserCreated',
    handler: onDocumentCreated('users/{uid}', async (document) => {
      if (document.data === undefined) {
        return;
      }
      const user = UserFirestoreModel.fromDocumentData(document.data?.data());
      const record = new DbChangedRecord(
        'USER_CREATED',
        `User ${user.firstName} ${user.lastName} has been created`,
        user.uid
      );
      await dbChangesService.addRecord(record);
    }),
  };

  private readonly onChanged: EventTriggerV2Function = {
    name: 'onUserChanged',
    handler: onDocumentUpdated('users/{uid}', async (document) => {
      try {
        if (document.data === undefined) {
          return;
        }
        const userBeforeUpdate = UserFirestoreModel.fromDocumentData(
          document.data.before.data()
        );
        const userAfterUpdate = UserFirestoreModel.fromDocumentData(
          document.data.after.data()
        );

        const uid = userAfterUpdate.uid;

        // if user membershipStatus is updated
        if (
          userBeforeUpdate.membershipStatus !== userAfterUpdate.membershipStatus
        ) {
          const status = userAfterUpdate.membershipStatus;
          await userService.updateMembershipStatus(uid, status);
        }

        // TODO handle if user membershipType is updated
        // TODO (if email updates is enabled)
        //    - send one - off email to notify subscription update

        const record = new DbChangedRecord(
          'USER_UPDATED',
          `User ${userAfterUpdate.firstName} ${userAfterUpdate.lastName} 
          has been updated`,
          userAfterUpdate.uid
        );
        await dbChangesService.addRecord(record);
      } catch (error) {
        // TODO handle error
      }
    }),
  };
}
