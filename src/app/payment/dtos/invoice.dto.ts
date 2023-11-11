export class InvoiceDto {

  id: string;
  amountPaid: number;
  total: number;
  billingReason: string;
  created: number;
  currency: string;
  invoicePdf: string;
  hostedInvoiceUrl: string;
  paid: boolean;
}
