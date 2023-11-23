import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SharedModule } from '../common/shared.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationsService } from './services/notifications.service';



@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgScrollbarModule
  ],
  providers: [NotificationsService],
  exports: [NotificationListComponent]
})
export class NotificationsModule { }
