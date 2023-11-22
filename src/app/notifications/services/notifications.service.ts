import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { NotificationResponseDTO } from '../dtos/response-notification.dto';

@Injectable()
export class NotificationsService {
  baseUrl = getBaseApiURL() + 'notifications/';

  _userNotifications: NotificationResponseDTO[];

  constructor(private _http: HttpClient) {}

  getAll(): Observable<IRequestResponse<NotificationResponseDTO[]>> {
    return this._http.get<IRequestResponse<NotificationResponseDTO[]>>(this.baseUrl + 'list')
    .pipe(tap(r => {
      if (r.success) {
        this._userNotifications  = r.data!
      }
    }))
  } 

  markMultipleAsSeen(ids: number[]): Observable<IRequestResponse<any>> {
    return this._http.put<IRequestResponse<any>>(this.baseUrl + 'mark-multiple-as-seen', { ids })
      .pipe(tap(response => {
        if (response.success) {
          // Update the local state of notifications
          this._userNotifications.forEach(notification => {
            if (ids.includes(notification.id)) {
              notification.isSeen = true;
            }
          });
        }
      }));
  }


  markAsRead(notificationId: number): Observable<IRequestResponse<any>> {
    return this._http.put<IRequestResponse<any>>(this.baseUrl + `${notificationId}/read`, {})
      .pipe(tap(response => {
        if (response.success) {
          // Find the notification and mark it as read
          const notification = this._userNotifications.find(n => n.id === notificationId);
          if (notification) {
            notification.isRead = true;
          }
        }
      }));
  }

  
  public get notifications() : NotificationResponseDTO[] {
    return MOCK_NOTIFICATIONS;
  }
  
}

export const MOCK_NOTIFICATIONS: NotificationResponseDTO[] = [
  {
    id: 1,
    title: 'New Message Received',
    message: 'You have a new message from John Doe.',
    isRead: false,
    isSeen: false,
    createdAt: new Date('2023-11-20T09:00:00')
  },
  {
    id: 2,
    title: 'Task Update',
    message: 'The task "Update Documentation" has been updated.',
    isRead: true,
    isSeen: true,
    createdAt: new Date('2023-11-19T15:30:00')
  },
  {
    id: 3,
    title: 'Meeting Reminder',
    message: 'You have a meeting tomorrow at 10 AM.',
    isRead: false,
    isSeen: true,
    createdAt: new Date('2023-11-18T12:45:00')
  },
  {
    id: 4,
    title: 'System Maintenance',
    message: 'The system will undergo maintenance on 23rd November.',
    isRead: true,
    isSeen: true,
    createdAt: new Date('2023-11-17T08:20:00')
  },
  {
    id: 5,
    title: 'New Assignment',
    message: 'You have been assigned a new project: "Angular Redesign".',
    isRead: false,
    isSeen: false,
    createdAt: new Date('2023-11-16T14:10:00')
  }
]