import { DocumentData, Timestamp } from 'firebase-admin/firestore';
import { Subscription } from '../../../subscription';

/**
 * public id: string,
    public memberId: string,
    public startDate: Date,
    public endDate: Date | null,
    public status: 'active' | 'paused' | 'canceled',
    public plan:
      | 'allstar'
      | 'nomad'
      | 'explorer'
      | 'socializer'
      | 'connector'
      | 'checkpoint'
      | 'daytripper'
      | 'weektripper',
    public autoRenew: boolean,
    public billingCycle: 'monthly' | 'trimestral' | 'semestral' | 'anual',
    public createdAt: Date,
    public updatedAt: Date
 */
export class SubscriptionFirestoreModel extends Subscription {
  static kId = 'id';
  static kUserId = 'user_id';
  static kStartDate = 'start_date';
  static kEndDate = 'end_date';
  static kStatus = 'status';
  static kPlan = 'plan';
  static kAutoRenew = 'auto_renew';
  static kBillingCycle = 'billing_cycle';
  static kCreatedAt = 'created_at';
  static kUpdatedAt = 'updated_at';

  static fromEntity(entity: Subscription): SubscriptionFirestoreModel {
    return Object.assign(SubscriptionFirestoreModel.empty(), entity);
  }
  static empty(): SubscriptionFirestoreModel {
    return new SubscriptionFirestoreModel(
      '',
      '',
      new Date(),
      null,
      'active',
      'allstar',
      true,
      'monthly',
      new Date(),
      new Date()
    );
  }

  static fromDocumentData(data: DocumentData) {
    return new SubscriptionFirestoreModel(
      data[SubscriptionFirestoreModel.kId],
      data[SubscriptionFirestoreModel.kUserId],
      (data[SubscriptionFirestoreModel.kStartDate] as Timestamp).toDate(),
      (data[SubscriptionFirestoreModel.kEndDate] as Timestamp).toDate(),
      data[SubscriptionFirestoreModel.kStatus],
      data[SubscriptionFirestoreModel.kPlan],
      data[SubscriptionFirestoreModel.kAutoRenew],
      data[SubscriptionFirestoreModel.kBillingCycle],
      (data[SubscriptionFirestoreModel.kCreatedAt] as Timestamp).toDate(),
      (data[SubscriptionFirestoreModel.kUpdatedAt] as Timestamp).toDate()
    );
  }
}
