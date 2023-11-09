import { IPricingCardRule } from "./pricing-card-rules.interface";

export interface IPriceCardData {
    id: number;
    imgSrc?: string;
    plan: string;
    description: string;
    btnText: string;
    free: boolean;
    planOriginalPrice: number;
    planDiscountPercentOff?: number;
    planAnnualPercentOff?: number;

    planPrice?: Number;
    popular?: boolean;
    rules: IPricingCardRule[];

    stripeMonthlyPriceId: string;
    stripeYearlyPriceId: string;

}