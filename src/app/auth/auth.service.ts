import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, shareReplay, tap } from 'rxjs';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { IJwtData } from '../common/dto/jwt-data.dto';
import { IRequestResponse } from '../common/dto/request-response.dto';
import { UserService } from '../user/services/user.service';
import { UserLogin } from './dtos/login.dto';
import { UserRegisterDto } from './dtos/user-register.dto';
import { SocketGatewayService } from '../socket-gateway/socket-gateway.service';
import { EventsHubService } from '../events-hub/events-hub.service';
import { EventType } from '../events-hub/enums/event-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = getBaseApiURL();
  redirectedUser: boolean = false;

  _jwtData: IJwtData | null;

  JWT_STORAGE_KEY = 'user_jwt_data';

  _registration_userEmail = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    protected $gaService: GoogleAnalyticsService,
    private _router: Router,
    private _jwtHelper: JwtHelperService,
    private _userService: UserService,
    private _socketService: SocketGatewayService,
    private _eventHub: EventsHubService
  ) {
    if (this.isLoggedIn()) {
      this._userService.getProfile(false).subscribe();

    }
  }

  verifyCode(email: string, verificationCode: string) {
    return this.http.post<IRequestResponse<any>>(
      this.baseUrl + 'auth/verify-code',
      { email, verificationCode }
    );
  }

  verifyToken(token: string): Observable<IRequestResponse<string>> {
    return this.http.post<IRequestResponse<string>>(
      this.baseUrl + 'auth/verify-token',
      { token }
    );
  }

  sendEmailVerification(email: string) {
    return this.http.post<IRequestResponse<any>>(
      this.baseUrl + 'auth/send-verification-email',
      { email }
    );
  }

  login(userLogin: UserLogin): Observable<any> {
    const result = this.http
      .post<IRequestResponse<any>>(this.baseUrl + 'auth/signin', userLogin)
      .pipe(
        tap((res) => {
          if (res.success) {
            this.setSession(res.data);
            this.registerUserActivity();
          } else {
            // console.error('There is an issue with the Registration')
            // console.error(res.error);
          }
        }),
        shareReplay()
      );
    return result;
  }

  register(userData: UserRegisterDto): Observable<IRequestResponse<any>> {
    return this.http
      .post<IRequestResponse<any>>(this.baseUrl + 'auth/register', userData)
      .pipe(
        tap((res) => {
          if (res.success) {
            this.setSession(res.data);
            this.registerUserActivity();
          } else {
            console.error('There is an issue with the Registration');
            console.error(res.error);
          }
        }),
        shareReplay()
      );
  }

  setSession(authResult: any) {
    const expiresAt = moment(authResult.expiresAt);

    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    if (authResult.firstSignInEver === 'true') {
      this._eventHub.emit(EventType.UserFirstSessionEver);
      this.$gaService.event(
        'user_register_done',
        'user_created',
        'third_party_provider'
      );
    }
    

    this.decodeJwt();

    this._userService.getProfile(false).subscribe();

    this._socketService.registerWithServer();
  }

  logout() {
    this._userService.cleanUserData();
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.cookieService.delete('access_token');
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.$gaService.event('user_logout', `manually_logged_out`);
    this._router.navigate(['/auth/login']);

    this._socketService.ngOnDestroy();
  }

  /**
   * to log out the user programmatically. It won't redirect the user.
   *
   * @memberof AuthService
   */
  logout_in_silence() {
    this._userService.cleanUserData();
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.cookieService.delete('access_token');
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.$gaService.event('user_logout', `programmatically_logged_out`);

    this._socketService.ngOnDestroy();

  }

  public isLoggedIn() {
    const result = moment().isBefore(this.getExpiration());
    return result;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }

    return moment().subtract(1, 'days');
  }

  private registerUserActivity() {
    this.cookieService.set('activeUser', 'true', this.getExpiration().hours());
  }

  private hasUserBeenActive() {
    return this.cookieService.get('activeUser') === 'true';
  }

  setUserRedirectedFromRegisterPageToLoginPage() {
    this.redirectedUser = true;
  }

  shouldRedirectUserFromRegisterPageToLoginPage() {
    return (
      document.referrer === 'https://adfluens.io/' &&
      this.hasUserBeenActive() &&
      !this.redirectedUser
    );
  }

  public get getJwt(): string | null {
    if (this.isLoggedIn()) return localStorage.getItem('id_token');
    else return null;
  }

  decodeJwt(): void {
    const jwt = this.getJwt;

    if (!jwt) {
      return;
    }

    this._jwtData = this._jwtHelper.decodeToken(jwt);
    localStorage.setItem(this.JWT_STORAGE_KEY, JSON.stringify(this._jwtData));
  }

  setRegistrationEmail(email: string): void {
    this._registration_userEmail = email;
  }

  public get userFirstName(): string | null {
    const jwtData = this.userJwtData;
    return jwtData ? jwtData.firstName : null;
  }

  public get userLastName(): string | null {
    const jwtData = this.userJwtData;
    return jwtData ? jwtData.lastName : null;
  }

  public get userEmail(): string | null {
    const jwtData = this.userJwtData;
    return jwtData ? jwtData.email : null;
  }

  public get userLastLoginProvider(): string | null {
    const jwtData = this.userJwtData;
    return jwtData ? jwtData.lastLoginProvider : null;
  }

  public get isFirstSessionEver(): boolean | null {
    const jwtData = this.userJwtData;
    return jwtData ? jwtData.firstSessionEver : null;
  }

  public get userJwtData(): IJwtData | null {
    const data = localStorage.getItem(this.JWT_STORAGE_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  public get registrationUserEmail(): string | null {
    return this._registration_userEmail;
  }
}
