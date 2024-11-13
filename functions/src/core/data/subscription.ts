// src/core/data/subscription.ts

export class Subscription {
  constructor(
    public id: string,
    public userId: string,
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
  ) {}
}
