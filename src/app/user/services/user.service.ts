import { Injectable } from '@angular/core';
import { StorageObjectNamesEnum } from '../../common/enum/storage-objects-name.enum';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';
import { IJwtData } from 'src/app/common/dto/jwt-data.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _jwtData: IJwtData | null;


  constructor(private _jwtHelper: JwtHelperService,
    private _authService: AuthService) { }

  decodeJwt(): void {
    const jwt = this._authService.getJwt;

    if (!jwt) {
      return;
    }

    this._jwtData = this._jwtHelper.decodeToken(jwt);
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
  
  


}