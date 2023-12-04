import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationResponseDTO } from '../../dtos/response-notification.dto';
import { NotificationsService } from '../../services/notifications.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  isLoading = false;

  @ViewChild('notificationOptions') menuTrigger: MatMenuTrigger;
  selectedNotificationId: number;

  constructor(
    private _notiService: NotificationsService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.isLoading = true;
    this._notiService.listNotifications().subscribe(() => {
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

  loadMoreNotifications($event: MouseEvent) {
    $event.stopPropagation();
    this.getNotifications();
  }

  openNotificationMenu($event:MouseEvent, notificationId: number) {
    $event.stopPropagation()
    this.selectedNotificationId = notificationId;
    this.menuTrigger.openMenu();
  }

  
  public get showLoadBtn() : boolean {
    return this._notiService.canLoadMoreNotifications;
  }
  
}
