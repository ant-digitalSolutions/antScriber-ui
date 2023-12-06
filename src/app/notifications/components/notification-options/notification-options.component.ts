import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification-options',
  templateUrl: './notification-options.component.html',
  styleUrls: ['./notification-options.component.scss'],
})
export class NotificationOptionsComponent {
  @Input() notificationId: number;

  @Output() close = new EventEmitter();

  /**
   *
   */
  constructor(private _notificationService: NotificationsService) {}

  deleteNotification($event: MouseEvent) {
    $event.stopPropagation();
    this._notificationService
      .deleteNotification(this.notificationId)
      .subscribe();
  }

  maskAsRead($event: MouseEvent) {
    $event.stopPropagation();

    this._notificationService
    .markAsRead(this.notificationId)
    .subscribe();

    this.close.emit();
  }
}
