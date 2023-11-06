import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AuthService } from 'src/app/auth/auth.service';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/user/services/user.service';
import { AppSearchDialogComponent } from '../../full/vertical/header/header.component';
import { BrandingComponent } from '../../full/vertical/sidebar/branding.component';

@Component({
  selector: 'app-header-menu-items',
  templateUrl: './header-menu-items.component.html',
  styleUrls: ['./header-menu-items.component.scss'],
  standalone: true,
  imports: [RouterModule, NgScrollbarModule, TablerIconsModule, MaterialModule, BrandingComponent, NgFor, NgIf, AppSearchDialogComponent]
})
export class HeaderMenuItemsComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _userService: UserService) {

  }


  signOut() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }


  public get userEmail(): string | null {
    return this._userService.userEmail;
  }

}
