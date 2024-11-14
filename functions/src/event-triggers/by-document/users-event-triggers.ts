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
import { logger } from 'firebase-functions/v2';

// eslint-disable-next-line max-len
import { UserFirestoreModel } from '../../core/data/models/user/firestore/user-firestore-model';
import { DbChangedRecord } from '../../core/data/db-changed-record';
import { dbChangesService } from '../../core/services/db-changes-service';
import { FirebaseSecrets } from '../../core/utils/firebase-secrets';
import { authService } from '../../core/services/auth-service';
import { sendgridService } from '../../core/services/sendgrid-service';
import { memberDataService } from '../../core/services/member-data-service';

export class UsersEventTriggers implements InitializeEventTriggers {
  initialize(add: AddEventTrigger): void {
    add(this.onCreated);
    add(this.onChanged);
  }

  private readonly onCreated: EventTriggerV2Function = {
    name: 'onUserCreated',
    handler: onDocumentCreated(
      { document: 'users/{uid}', region: 'europe-west3' },
      async (document) => {
        if (document.data === undefined) {
          return;
        }
        const user = UserFirestoreModel.fromDocumentData(document.data?.data());
        // If email is nic@savage-coworking.com, set user role to admin.
        if (user.signupEmail == 'nic@savage-coworking.com') {
          await authService.updateCustomClaim(user.uid, 'admin', true);
        }
        const record = new DbChangedRecord(
          'USER_CREATED',
          `User ${user.firstName} ${user.lastName} has been created`,
          user.uid
        );
        await dbChangesService.addRecord(record);
      }
    ),
  };

  private readonly onChanged: EventTriggerV2Function = {
    name: 'onUserChanged',
    handler: onDocumentUpdated(
      {
        document: 'users/{uid}',
        region: 'europe-west3',
        secrets: [FirebaseSecrets.sendgridApiKey],
      },
      async (document) => {
        try {
          if (document.data === undefined) {
            return;
          }
          const userBeforeUpdate = UserFirestoreModel.fromDocumentData(
            document.data.before.data()
          );
          const user = UserFirestoreModel.fromDocumentData(
            document.data.after.data()
          );

          // if user membershipStatus is updated
          const status = user.membershipStatus;
          if (userBeforeUpdate.membershipStatus !== status && status != null) {
            logger.debug('user status has changed');
            // Update Custom Claim
            await authService.updateCustomClaim(
              user.uid,
              'client',
              status === 'active'
            );
            // Update member object
            const memberDataId = user.memberDataId;
            if (memberDataId != null) {
              memberDataService.updateStatus(memberDataId, status);
            }

            // Update Sendgrid Contact
            await sendgridService.updateContact(user);
            // TODO Update Nuki service
          }

          // // if user membership types are updated
          // const membershipTypes = user.membershipTypes;
          // if (userBeforeUpdate.membershipTypes !== membershipTypes) {
          //   // get the new membership types
          //   const newSubscriptions: string[] = membershipTypes.filter(
          //     (item) => !userBeforeUpdate.membershipTypes.includes(item)
          //   );
          //   const cancelledSubscriptions: string[] =
          //     userBeforeUpdate.membershipTypes.filter(
          //       (item) => !membershipTypes.includes(item)
          //     );
          //   await userService.updateMembershipTypes(
          //     user,
          //     newSubscriptions,
          //     cancelledSubscriptions
          //   );
          // }

          const record = new DbChangedRecord(
            'USER_UPDATED',
            `User ${user.firstName} ${user.lastName} 
          has been updated`,
            user.uid
          );
          await dbChangesService.addRecord(record);
        } catch (error: unknown) {
          // TODO handle error
          logger.error(
            `error on document update user: ${document.params.uid}`,
            error
          );
        }
      }
    ),
  };
}
