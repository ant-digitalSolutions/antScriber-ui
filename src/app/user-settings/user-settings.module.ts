import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserSettingsHomeComponent } from './user-settings-home/user-settings-home.component';
import { UserSettingsRoutes } from './user-settings-routing.module';



@NgModule({
  declarations: [
    UserSettingsHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserSettingsRoutes)
  ]
})
export class UserSettingsModule { }
