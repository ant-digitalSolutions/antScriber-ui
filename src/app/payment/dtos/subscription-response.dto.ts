import { PlanDto } from "./plan.dto";

export class SubscriptionResponseDTO {

  status: string;
  startDate: number;
  currency: string;
  description: string;
  billingCycleAnchor: number;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  plan?: PlanDto;

  cancelAtEndOfPeriod: boolean;
}