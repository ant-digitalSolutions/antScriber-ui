import { InvoiceDto } from './invoice.dto';

export enum SubscriptionUpdateType {
  Upgrade = 'upgrade',
  Downgrade = 'downgrade',
  Error = 'error',
  None = 'none',
}

export class SubscriptionUpdateDTO {
  status: SubscriptionUpdateType;
  invoice: InvoiceDto | string;
  customerBalance: number;
  errorMessage: string;
}

