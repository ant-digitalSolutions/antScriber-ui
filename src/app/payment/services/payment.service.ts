import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ICreateSubscriptionPaymentSessionDto } from '../dtos/create-suscription-payment-session.dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl = getBaseApiURL();

  _isPremiumUser?: boolean;

  constructor(private http: HttpClient) {}

  getAdfluentsProductPermanentLink(): Observable<IRequestResponse<string>> {
    let params = new HttpParams();
    params = params.append(
      'successURL',
      window.location.protocol +
        '//' +
        window.location.host +
        '/checkout-return?session_id={CHECKOUT_SESSION_ID}'
    );
    params = params.append(
      'cancelURL',
      window.location.protocol +
        '//' +
        window.location.host +
        '/checkout-return?session_id={CHECKOUT_SESSION_ID}'
    );
    return this.http.get<IRequestResponse<string>>(
      this.baseUrl + 'payment/create-product-permanent-link',
      { params: params }
    );
  }

  getUserSubscriptionType() {
    return this.http
      .get<IRequestResponse<boolean>>(
        this.baseUrl + 'payment/subscription-type'
      )
      .pipe(
        tap((result) => {
          this._isPremiumUser = result.data;
        })
      );
  }

  getSubscriptionInfo() {
    return this.http.get<IRequestResponse<boolean>>(this.baseUrl + 'subscription/info');
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
        '/succespayment',
      cancelURL:
        window.location.protocol +
        '//' +
        window.location.host +
        '/cancelpayment',
      prodPriceId,
    };
    return this.http.post<IRequestResponse<any>>(
      this.baseUrl + 'payment/create-subscription-payment-session',
      data
    );
  }
}
