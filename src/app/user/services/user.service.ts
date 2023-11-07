import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJwtData } from 'src/app/common/dto/jwt-data.dto';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { environment } from 'src/environments/environment';
import { IUserChangePasswordDto } from '../dto/user-change-password.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  _jwtData: IJwtData | null;

  showInitialTour: boolean;

  baseUrl = getBaseApiURL() + 'users';


  constructor(private _httpClient: HttpClient) { }

  initialWalkthroughCompleted() {
    localStorage.setItem('walkthrough_initial_tour', 'completed');
    this.showInitialTour = false;
  }

  updatePassword(values: IUserChangePasswordDto): Observable<IRequestResponse<string | boolean>> {
    const currentUserUUID = this.userJwtData?.user_uuid;
    values.userUUID = currentUserUUID;

    return this._httpClient.put<IRequestResponse<string | boolean>>(`${this.baseUrl}/password/${currentUserUUID}`, values);
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

    return (tourStatus != null && tourStatus === 'completed')
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



}