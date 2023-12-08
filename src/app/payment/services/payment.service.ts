import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ICreateSubscriptionPaymentSessionDto } from '../dtos/create-suscription-payment-session.dto';
import { InvoiceDto } from '../dtos/invoice.dto';
import { SubscriptionUpdateDTO } from '../dtos/subscription-update.dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  
  baseUrl = getBaseApiURL();

  _isPremiumUser?: boolean;

  constructor(private http: HttpClient) {}

  getUserSubscriptionType() {
    return this.http
      .get<IRequestResponse<boolean>>(this.baseUrl + 'user-subscription/type')
      .pipe(
        tap((result) => {
          this._isPremiumUser = result.data;
        })
      );
  }

  getSubscriptionInfo() {
    return this.http.get<IRequestResponse<any>>(
      this.baseUrl + 'subscription/info'
    );
  }

  cancelSubscription() {
    return this.http.get<IRequestResponse<string>>(
      this.baseUrl + 'subscription/cancel'
    );
  }

  generatePaymentSession(
    prodPriceId: string
  ): Observable<IRequestResponse<any>> {
    const data: ICreateSubscriptionPaymentSessionDto = {
      successURL:
        window.location.protocol +
        '//' +
        window.location.host +
        '/settings/plans/checkout-return?session_id={CHECKOUT_SESSION_ID}',
      cancelURL:
        window.location.protocol +
        '//' +
        window.location.host +
        '/settings/plans/checkout-return?session_id={CHECKOUT_SESSION_ID}',
      prodPriceId,
    };
    return this.http.post<IRequestResponse<any>>(
      this.baseUrl + 'checkout/create-subscription-payment-session',
      data
    );
  }

  getStripeSession(sessionId: string) {
    let params = new HttpParams();
    params = params.append('sessionId', sessionId);

    return this.http.get<IRequestResponse<any>>(
      this.baseUrl + 'checkout/checkout-session-result',
      { params }
    );
  }

  listInvoices() {
    return this.http.get<IRequestResponse<InvoiceDto[]>>(
      this.baseUrl + 'invoice/list'
    );
  }

  getSubscriptionUpdateData(
    priceId: string
  ): Observable<IRequestResponse<SubscriptionUpdateDTO>> {
    return this.http.get<IRequestResponse<SubscriptionUpdateDTO>>(this.baseUrl + `user-subscription/get-subscription-update-data?priceId=${priceId}`);
  }

  updateSubscription(subscriptionUpdateDTO: SubscriptionUpdateDTO) {
    const data = {
      subscriptionId: subscriptionUpdateDTO.subscriptionId,
      newPriceId: subscriptionUpdateDTO.newPriceId
    }
    return this.http.post<IRequestResponse<InvoiceDto>>(this.baseUrl + 'user-subscription/update-subscription', {
      data
    });
  }

  createCustomerPortalSession() {
    return this.http
    .get<IRequestResponse<any>>(this.baseUrl + 'user-subscription/customer-portal-session');
  }
}
