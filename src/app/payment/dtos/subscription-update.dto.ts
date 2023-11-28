
export enum SubscriptionUpdateType {
  Upgrade = 'upgrade',
  Downgrade = 'downgrade',
  Error = 'error',
  None = 'none',
}

export class SubscriptionUpdateDTO {
  status: SubscriptionUpdateType;
  subscriptionId: string;
  currentProductId: string;
  customerId: string;

  currentPlanName: string;
  currentPlanCost: number;
  currentPlanBilled: 'yearly' | 'monthly';

  newPriceId: string;
  newPlanName: string;
  newPlanCost: number;
  newPlanBilled: 'yearly' | 'monthly';

  toPayNow: number;

  startingBalance: number;

  endingBalance: number;

  currency: string;

  errorMessage: string;

  currentSubscriptionCostingDetails: {
    amount: number;
    description: string;
  };

  newSubscriptionCostingDetails: {
    amount: number;
    description: string;
  };
}