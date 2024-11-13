// src/event-trigger/by-document/subscription-event-triggers.ts
import { onDocumentCreated } from 'firebase-functions/firestore';
import {
  AddEventTrigger,
  EventTriggerV2Function,
  InitializeEventTriggers,
} from '../initialize-event-triggers';
import { DbChangedRecord } from '../../core/data/db-changed-record';
import { dbChangesService } from '../../core/services/db-changes-service';
import { logger } from 'firebase-functions/v2';
// eslint-disable-next-line max-len
import { SubscriptionFirestoreModel } from '../../core/data/models/subscription/firestore/subscription-firestore-model';

export class SubscriptionEventTriggers implements InitializeEventTriggers {
  initialize(add: AddEventTrigger): void {
    add(this.onCreated);
  }

  private readonly onCreated: EventTriggerV2Function = {
    name: 'onSubscriptionCreated',
    handler: onDocumentCreated(
      { document: 'subscriptions/{subscriptionId}', region: 'europe-west3' },
      async (document) => {
        logger.debug(`subscription created: ${document.params.subscriptionId}`);
        if (document.data === undefined) {
          logger.warn('document data is undefined');
          return;
        }
        const subscription = SubscriptionFirestoreModel.fromDocumentData(
          document.data?.data()
        );
        // Add record to db
        const record = new DbChangedRecord(
          'SUBSCRIPTION_CREATED',
          `Subscription ${subscription.id} has been created`,
          subscription.userId
        );
        await dbChangesService.addRecord(record);

        // update user object with new subscription id

        // if status is active
        // update user membership status to active
        // Send transactional email
      }
    ),
  };
}
