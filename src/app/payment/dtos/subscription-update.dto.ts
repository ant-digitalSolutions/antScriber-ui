
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

  newPriceId:string;
  newPlanName: string;
  newPlanCost: number;
  newPlanBilled: 'yearly' | 'monthly';
  
  currency: string;

 proration: number;
  /**
   * Indicates the amount of money the user has to pay.
   * This value should be less than the plan pricing if `moneyBalance` > 0
   *
   * @type {number}
   * @memberof SubscriptionUpdateDTO
   */
  toPayNow: number;

  /**
   * Indicates the amount of money the customer has on our behalf.
   * if this value != 0, then we won't take $ from the customer
   * until the balance reach 0
   *
   * @type {number}
   * @memberof SubscriptionUpdateDTO
   */
  moneyBalance: number;

  errorMessage: string;
}
