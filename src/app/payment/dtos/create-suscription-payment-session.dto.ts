export interface ICreateSubscriptionPaymentSessionDto {
    successURL: string;

    cancelURL: string;

    // indicate the id of the price selected by
    // the user.
    prodPriceId: string;
}