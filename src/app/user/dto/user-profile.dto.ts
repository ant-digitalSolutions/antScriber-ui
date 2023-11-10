import { UserSubscriptionDto } from "./user-subscription-data.dto";
export class IUserProfileDto {
  firstName: string;

  lastName: string;

  email?: string;

  company?: string;

  companyRole?: string;

  subscriptionData: UserSubscriptionDto;
}
