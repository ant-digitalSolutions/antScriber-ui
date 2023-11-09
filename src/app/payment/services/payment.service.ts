import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = getBaseApiURL();

  _isPremiumUser: boolean;

  constructor(private http: HttpClient) { }

  getAdfluentsProductPermanentLink(): Observable<IRequestResponse<string>> {
    let params = new HttpParams();
    params = params.append('successURL', window.location.protocol + "//" + window.location.host + "/succespayment");
    params = params.append('cancelURL', window.location.protocol + "//" + window.location.host + "/cancelpayment");
    return this.http.get<IRequestResponse<string>>(this.baseUrl + 'payment/create-product-permanent-link', { params: params });
  }

  getUserSubscriptionType() {
    return this.http.get<IRequestResponse<boolean>>(this.baseUrl + 'payment/subscription-type')
      .pipe(tap(result => {
        result.
    }));
  }

  getSubscriptionInfo() {
    return this.http.get<IRequestResponse<boolean>>(this.baseUrl + 'subscription/info');
  }

  cancelSubscription() {
    return this.http.get<IRequestResponse<string>>(this.baseUrl + 'subscription/cancel');
  }
}
