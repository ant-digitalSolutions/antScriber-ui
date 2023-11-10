import { ProductsEnum } from "src/app/common/subscriptions/products.enum";

export class UserSubscriptionDto {
  mainSubscription: ProductsEnum;

  stripePriceId: string;

  static createFreeSubscription(): UserSubscriptionDto {
    const output = new UserSubscriptionDto();

    output.mainSubscription = ProductsEnum.FREE;
    output.stripePriceId = 'free'

    return output;
  }
}
