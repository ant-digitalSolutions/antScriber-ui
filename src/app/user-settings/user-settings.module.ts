import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AnalyticsModule } from '../analytics/analytics.module';
import { AppHorizontalSidebarComponent } from '../layouts/full/horizontal/sidebar/sidebar.component';
import { AppNavItemComponent } from '../layouts/full/vertical/sidebar/nav-item/nav-item.component';
import { SidebarComponent } from '../layouts/full/vertical/sidebar/sidebar.component';
import { MaterialModule } from '../material.module';
import { PricingModule } from '../pricing/pricing.module';
import { UserSettingsBillingComponent } from './components/user-settings-billing/user-settings-billing.component';
import { UserSettingsChangePasswordComponent } from './components/user-settings-change-password/user-settings-change-password.component';
import { UserSettingsNavbarComponent } from './components/user-settings-navbar/user-settings-navbar.component';
import { UserSettingsProfileComponent } from './components/user-settings-profile/user-settings-profile.component';
import { UserSettingsHomeComponent } from './user-settings-home/user-settings-home.component';
import { UserSettingsRoutes } from './user-settings-routing.module';



@NgModule({
  declarations: [
    UserSettingsHomeComponent,
    UserSettingsProfileComponent,
    UserSettingsNavbarComponent,
    UserSettingsBillingComponent,
    UserSettingsChangePasswordComponent,
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
    FormsModule,
    ReactiveFormsModule,
    PricingModule,
    AnalyticsModule
  ]
})
export class UserSettingsModule { }
