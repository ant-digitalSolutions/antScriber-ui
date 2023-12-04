import { Component, Input } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-options',
  templateUrl: './notification-options.component.html',
  styleUrls: ['./notification-options.component.scss']
})
export class NotificationOptionsComponent {

  @Input() notificationId: number;

  /**
   *
   */
  constructor(private _notificationService: NotificationsService) {
    
  }

  deleteNotification($event: MouseEvent) {
    $event.stopPropagation();
    this._notificationService.deleteNotification(this.notificationId).subscribe();
  }
}
