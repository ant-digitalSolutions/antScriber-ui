import { Injectable } from '@angular/core';
import { IJwtData } from 'src/app/common/dto/jwt-data.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _jwtData: IJwtData | null;

  showInitialTour: boolean;


  constructor() { }

  initialWalkthroughCompleted() {
    localStorage.setItem('walkthrough_initial_tour', 'completed');
    this.showInitialTour = false;
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


  public get userDisplayName(): string | null {
    if (this.userJwtData) {
      return this.userJwtData.displayName;
    } else {
      return null;
    }
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