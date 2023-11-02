import { Injectable } from '@angular/core';
import { StorageObjectNamesEnum } from '../../common/enum/storage-objects-name.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { IJwtData } from 'src/app/common/dto/jwt-data.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _jwtData: IJwtData | null;
  
  showInitialTour: boolean;


  constructor(private _jwtHelper: JwtHelperService,
    private _authService: AuthService) { }

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
    public get walkthrough_InitialTour_IsCompleted() : boolean {
      const tourStatus = localStorage.getItem('walkthrough_initial_tour');

      return (tourStatus != null && tourStatus === 'completed')
    }
    

  public get userDisplayName(): string | null {
    if (this._jwtData) {
      return this._jwtData.displayName;
    } else {
      return null;
    }
  }

  
  public get userEmail() : string | null {
    return this._jwtData ? this._jwtData.email : null;
  }

  
  public get userLastLoginProvider() : string | null {
    return this._jwtData ? this._jwtData.lastLoginProvider : null;
  }
  
  public get userJwtData(): IJwtData | null {
    const data = localStorage.getItem(environment.JWT_STORAGE_KEY);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  }
  


}