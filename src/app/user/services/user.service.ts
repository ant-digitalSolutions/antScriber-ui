import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscriber, tap } from 'rxjs';
import { subscriptionLimitReachedObserver } from 'src/app/common/common-events';
import { SubscriptionUsageLimitException } from 'src/app/common/dto/errors/subscription-usage-limit-exception.dto';
import { IJwtData } from 'src/app/common/dto/jwt-data.dto';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { OpenAiGPTVersionEnum } from 'src/app/common/enum/content generation/openai-gtp-version.enum';
import { StorageObjectNamesEnum } from 'src/app/common/enum/storage-objects-name.enum';
import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';
import { IUserUpdateDto } from 'src/app/user-settings/dtos/user-update.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { environment } from 'src/environments/environment';
import { IUserChangePasswordDto } from '../dto/user-change-password.dto';
import { IUserProfileDto } from '../dto/user-profile.dto';
import { UserSubscriptionDto } from './../dto/user-subscription-data.dto';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  _jwtData: IJwtData | null;

  baseUrl = getBaseApiURL() + 'users';

  _userProfile: IUserProfileDto;

  constructor(
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private _router: Router,
  ) {
    subscriptionLimitReachedObserver.subscribe((r) => {
      if (r) this.subscriptionLimitReached(r);
    });

   

  }

  initialWalkthroughCompleted() {
    localStorage.setItem('walkthrough_initial_tour', 'completed');
  }

  updatePassword(
    values: IUserChangePasswordDto
  ): Observable<IRequestResponse<boolean>> {
    const currentUserUUID = this.userJwtData?.user_uuid;
    values.userUUID = currentUserUUID;

    return this._httpClient.put<IRequestResponse<boolean>>(
      `${this.baseUrl}/password/${currentUserUUID}`,
      values
    );
  }

  updateProfile(
    userData: IUserUpdateDto
  ): Observable<IRequestResponse<boolean>> {
    const currentUserUUID = this.userJwtData?.user_uuid;
    userData.userUUID = currentUserUUID!;

    return this._httpClient.put<IRequestResponse<boolean>>(
      `${this.baseUrl}/profile/${currentUserUUID}`,
      userData
    );
  }


  getProfile(
    checkCache: boolean = true
  ): Observable<IRequestResponse<IUserProfileDto>> {
    const localProfile = localStorage.getItem(
      StorageObjectNamesEnum.UserProfile
    );

    if (localProfile && checkCache) {
      return new Observable<IRequestResponse<IUserProfileDto>>(
        (sub: Subscriber<any>) =>
          sub.next({
            data: JSON.parse(localProfile) as any as IUserProfileDto,
            success: true,
          })
      );
    }

    return this._httpClient
      .get<IRequestResponse<IUserProfileDto>>(`${this.baseUrl}/profile`)
      .pipe(
        tap((r) => {
          if (r.success) {
            localStorage.setItem(
              StorageObjectNamesEnum.UserProfile,
              JSON.stringify(r.data)
            );
          }
        })
      );
  }

  userHasPassword(): Observable<IRequestResponse<boolean>> {
    return this._httpClient.get<IRequestResponse<boolean>>(
      `${this.baseUrl}/has-password`
    );
  }

  // true if the current user is premium
  userIsPremium(): boolean {
    const localProfileString = localStorage.getItem(
      StorageObjectNamesEnum.UserProfile
    );

    if (!localProfileString) {
      return false;
    }

    const userProfile = JSON.parse(localProfileString) as IUserProfileDto;

    return (
      userProfile.subscriptionData &&
      userProfile.subscriptionData.mainSubscription !== ProductsEnum.FREE
    );
  }

  getUserSubscription(): UserSubscriptionDto {
    const localProfileString = localStorage.getItem(
      StorageObjectNamesEnum.UserProfile
    );

    if (!localProfileString) {
      return UserSubscriptionDto.createFreeSubscription();
    }

    const userProfile = JSON.parse(localProfileString) as IUserProfileDto;

    return userProfile.subscriptionData
      ? userProfile.subscriptionData
      : UserSubscriptionDto.createFreeSubscription();
  }

  subscriptionLimitReached(error: SubscriptionUsageLimitException) {
    localStorage.setItem(
      error.gptVersion === OpenAiGPTVersionEnum.GPT3
        ? StorageObjectNamesEnum.HasAvailableQuota_GPT_3
        : StorageObjectNamesEnum.HasAvailableQuota_GPT_4,
      'false'
    );

    const stack = this._snackBar.open(
      `Oops, you just reached your subscription's limits for: ${error.gptVersion}.`,
      'Upgrade',
      {
        panelClass: 'snack-error',
        duration: 10000,
      }
    );

    stack.onAction().subscribe(() => {
      this._router.navigate(['/settings/plans']);
    });
  }

  cleanUserData() {
    localStorage.removeItem(StorageObjectNamesEnum.UserProfile);
    localStorage.removeItem(StorageObjectNamesEnum.HasAvailableQuota_GPT_3);
    localStorage.removeItem(StorageObjectNamesEnum.HasAvailableQuota_GPT_4);
  }

  /**
   * True if the user has already done the initial tour walkthrough
   *
   * @readonly
   * @type {boolean}
   * @memberof UserService
   */
  public get walkthrough_InitialTour_IsCompleted(): boolean {
    const tourStatus = localStorage.getItem('walkthrough_initial_tour');

    return tourStatus != null && tourStatus === 'completed';
  }

  public get userFirstName(): string | null {
    const userProfile = this.userProfile;
    return userProfile ? userProfile.firstName : null;
  }

  public get userLastName(): string | null {
    const userProfile = this.userProfile;
    return userProfile ? userProfile.lastName : null;
  }

  public get userEmail(): string | null {
    return this.userJwtData ? this.userJwtData.email : null;
  }

  public get userLastLoginProvider(): string | null {
    return this.userJwtData ? this.userJwtData.lastLoginProvider : null;
  }

  public get userJwtData(): IJwtData | null {
    const data = localStorage.getItem(environment.JWT_STORAGE_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  public get userProfile(): IUserProfileDto | undefined {
    const localProfile = localStorage.getItem(
      StorageObjectNamesEnum.UserProfile
    );

    if (localProfile) return JSON.parse(localProfile) as any as IUserProfileDto;

    return undefined;
  }
}
