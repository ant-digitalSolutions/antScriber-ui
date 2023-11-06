import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AppHorizontalSidebarComponent } from '../layouts/full/horizontal/sidebar/sidebar.component';
import { AppNavItemComponent } from '../layouts/full/vertical/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from '../layouts/full/vertical/sidebar/sidebar.component';
import { MaterialModule } from '../material.module';
import { UserSettingsHomeComponent } from './user-settings-home/user-settings-home.component';
import { UserSettingsRoutes } from './user-settings-routing.module';
import { UserSettingsProfileComponent } from './components/user-settings-profile/user-settings-profile.component';
import { UserSettingsNavbarComponent } from './components/user-settings-navbar/user-settings-navbar.component';



@NgModule({
  declarations: [
    UserSettingsHomeComponent,
    UserSettingsProfileComponent,
    UserSettingsNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserSettingsRoutes),
    NgScrollbarModule,
    AppHorizontalSidebarComponent,
    SidebarComponent,
    MaterialModule,
    RouterModule,
    CommonModule,
    AppNavItemComponent,
  ]
})
export class UserSettingsModule { }
