
export class PlanDto {

  active: boolean;
  aggregateUsage: any;
  amount: number;
  amountDecimal: string;
  billingScheme: string;
  created: number;
  currency: string;
  id: string;
  interval: string;
  intervalCount: number;
  livemode: boolean;
  metadata: { [key: string]: any };
  nickname: string;
  object: string;
  product: string;
  tiersMode: null;
  transformUsage: any;
  trialPeriodDays: number;
  usageType: string;
}
