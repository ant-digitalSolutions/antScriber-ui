import { InvoiceDto } from "./invoice.dto";
import { SubscriptionResponseDTO } from "./subscription-response.dto";

export class PaymentSessionDto {
    customerId: string;
    subscriptionId: string;
    customerDetails: any;
    paymentStatus: any;

    invoice: InvoiceDto | string | null;

    subscription: SubscriptionResponseDTO | string | null;
}
