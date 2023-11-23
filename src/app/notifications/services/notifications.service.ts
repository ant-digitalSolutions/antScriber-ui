import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { NotificationResponseDTO } from '../dtos/response-notification.dto';

@Injectable()
export class NotificationsService {
  baseUrl = getBaseApiURL() + 'notifications/';

  _userNotifications: NotificationResponseDTO[] = [];

  private _unseenNotifications: number = 0;

  // the amount of notifications to get in each request
  _amountOfNotificationToGet = 5;

  // for the pagination of the notifications
  _pageIndex = 0;

  // indicate if the user can load more notifications from the server.
  _canLoadMoreNotifications = true;

  constructor(private _http: HttpClient) {
    this.checkForUnseenNotificationsRunner();
  }

  // every 30 seconds, request the unseen notifications
  checkForUnseenNotificationsRunner() {
    interval(30000)
      .pipe(switchMap(() => this.getUnseenNotificationCount()))
      .subscribe({
        complete: () => console.info('Got notification count'),
      });
  }

  listNotifications() {
    let params = new HttpParams()
      .set('amountOfNotifications', this._amountOfNotificationToGet)
      .set('pageIndex', this._pageIndex++);

    return this._http
      .get<IRequestResponse<NotificationResponseDTO[]>>(this.baseUrl + 'list', {
        params,
      })
      .pipe(
        tap((r) => {
          if (r.success) {
            this._userNotifications.push(...r.data!);
          } else {
            this._canLoadMoreNotifications = false;
          }
        })
      );
  }

  markMultipleAsSeen(): Observable<IRequestResponse<boolean>> {
    const notificationSeenIds = this.notifications
      .filter((n) => !n.isSeen)
      .map((n) => n.id);

    return this._http
      .put<IRequestResponse<boolean>>(this.baseUrl + 'mark-multiple-as-seen', {
        notificationSeenIds,
      })
      .pipe(
        tap((response) => {
          if (response.success) {
            // Update the local state of notifications
            setTimeout(() => {
              this._userNotifications.forEach((notification) => {
                if (notificationSeenIds.includes(notification.id)) {
                  notification.isSeen = true;
                }
              });
            }, 5000);
          }
        })
      );
  }

  markAsRead(notificationId: number): Observable<IRequestResponse<any>> {
    return this._http
      .put<IRequestResponse<any>>(this.baseUrl + `${notificationId}/read`, {})
      .pipe(
        tap((response) => {
          if (response.success) {
            // Find the notification and mark it as read
            const notification = this._userNotifications.find(
              (n) => n.id === notificationId
            );
            if (notification) {
              notification.isRead = true;
            }
          }
        })
      );
  }

  /**
   * Returns the amount of un-seen notification in te last 30 days.
   *
   * @return {*}  {Observable<IRequestResponse<number>>}
   * @memberof NotificationsService
   */
  getUnseenNotificationCount(): Observable<IRequestResponse<number>> {
    return this._http
      .get<IRequestResponse<number>>(this.baseUrl + `unseen-count`)
      .pipe(
        tap((r) => {
          if (r.success) {
            this._unseenNotifications = r.data!;
          }
        })
      );
  }

  resetNotificationCount() {
    this._unseenNotifications = 0;
  }

  public get notifications(): NotificationResponseDTO[] {
    return this._userNotifications;
  }

  public get unseenNotifications(): number {
    return this._unseenNotifications;
  }

  
  public get canLoadMoreNotifications() : boolean {
    return this._canLoadMoreNotifications;
  }
  
}
