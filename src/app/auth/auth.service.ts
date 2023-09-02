import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin } from './dtos/login.dto';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(userLogin: UserLogin): Observable<any> {
    const result = this.http.post<UserLogin>(this.baseUrl + 'auth/signin', userLogin)
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
    return result;
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
