import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { NotificationResponseDTO } from '../dtos/response-notification.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventsHubService } from 'src/app/events-hub/events-hub.service';
import { EventType } from 'src/app/events-hub/enums/event-type.enum';

@Injectable({
  providedIn: 'root',
})
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

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar, private _eventsHub: EventsHubService) {
    this.getUnseenNotificationCount();

    this._eventsHub.EventEmitter.subscribe(e => {
      if (e.type === EventType.NotificationNew) {
        this._unseenNotifications++;
        this._userNotifications.unshift(e.data)
      }
    })
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
            if (r.data!.length < this._amountOfNotificationToGet ) {
              this._canLoadMoreNotifications = false;
            }
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

  deleteNotification(notificationId: number): Observable<IRequestResponse<boolean>> {
    return this._http.delete<IRequestResponse<boolean>>(this.baseUrl + notificationId)
      .pipe(
        tap(response => {
          if (response && response.success) {
            // Remove the notification from the local array
            this._userNotifications = this._userNotifications.filter(notification => notification.id !== notificationId);
            this._snackBar.open(`Notification Deleted.`, undefined, {
              duration: 2500,
              panelClass: 'snack-success'
            });
          }
        }),
        catchError(error => {
          // Handle the error appropriately
          console.error('Error occurred while deleting notification:', error);
          return throwError(() => new Error('Error occurred while deleting notification'));
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
