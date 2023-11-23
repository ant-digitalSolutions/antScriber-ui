import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationResponseDTO } from '../../dtos/response-notification.dto';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  isLoading = false;

  constructor(
    private _notiService: NotificationsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getNotifications()
  }

  getNotifications() {
    this.isLoading = true;
    this._notiService.getAll().subscribe(() => {
      this.isLoading = false;
    });
  }


  public get notificationsList(): NotificationResponseDTO[] {
    return this._notiService.notifications;
  }

  onClick(noti: NotificationResponseDTO) {
    console.log(`Click on Notification with ID: ${noti.id}`);
    
    this._notiService.markAsRead(noti.id).subscribe();

    if (noti.redirectUrlAfterClick) {
      this._router.navigate([noti.redirectUrlAfterClick]);
    }
  }
}
