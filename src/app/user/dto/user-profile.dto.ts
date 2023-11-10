import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';

export class IUserProfileDto {
  firstName: string;

  lastName: string;

  email?: string;

  company?: string;

  companyRole?: string;

  mainSubscription: ProductsEnum;
}
