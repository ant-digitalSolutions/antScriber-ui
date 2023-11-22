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
    throw new Error('Method not implemented.');
  }

  getNotifications() {
    this.isLoading = true;
    this._notiService.getAll().subscribe((r) => {
      this.isLoading = false;
      console.log(`Notifications: ${JSON.stringify(r.data)}`);
    });
  }

  public get notificationsList(): NotificationResponseDTO[] {
    return this._notiService.notifications;
  }

  onClick(noti: NotificationResponseDTO) {
    console.log(`Click on Notification with ID: ${noti.id}`);
    if (noti.redirectUrlAfterClick) {
      this._router.navigate([noti.redirectUrlAfterClick]);
    }
  }
}
