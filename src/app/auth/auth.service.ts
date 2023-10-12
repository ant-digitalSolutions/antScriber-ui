import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin } from './dtos/login.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import * as moment from 'moment';
import { IRequestResponse } from '../common/dto/request-response.dto';
import { UserRegisterDto } from './dtos/user-register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(userLogin: UserLogin): Observable<any> {
    const result = this.http.post<IRequestResponse<any>>(this.baseUrl + 'auth/signin', userLogin)
      .pipe(
        tap(res => {
          if (res.success) {
            this.setSession(res.data)
          } else {
            console.error('There is an issue with the Registration')
            console.error(res.error);
          }
        }),
        shareReplay()
      );
    return result;
  }

  register(userData: UserRegisterDto): Observable<IRequestResponse<any>> {
    return this.http.post<IRequestResponse<any>>(this.baseUrl + 'auth/register', userData)
      .pipe(
        tap(res => {
        if (res.success)
         {
           this.setSession(res.data)
          } else {
            console.error('There is an issue with the Registration')
            console.error(res.error);
          }
        }),
        shareReplay()
      );
  }

  private setSession(authResult: any) {
    const expiresAt = moment(authResult.expiresAt);

    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    const result = moment().isBefore(this.getExpiration());
    return result;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }

    return moment().subtract(1, 'days');
  }
}
