import { IPricingCardRule } from './pricing-card-rules.interface';

export interface IPriceCardData {
  index: number;
  imgSrc?: string;
  plan: string;
  description: string;
  btnText: string;
  free: boolean;
  planMonthlyPrice: number;
  planDiscountPercentOff?: number;
  planAnnualPercentOff?: number;

  planAnnualPrice: number;

  planPrice?: Number;
  popular?: boolean;
  rules: IPricingCardRule[];

  stripeMonthlyPriceId: string;
  stripeYearlyPriceId: string;

  // the ProductId in stripe
  id: string;
}
