import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ChatThreadDto } from '../dtos/chat-thread.dto';
import { ChatMessageDto } from '../dtos/message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatThreadsService {
  baseUrl = getBaseApiURL() + 'chat-threads';

  _currentThread: string;

  _currentAssistant: string = 'asst_Dy9FXW6cFyJRCqDS2R5V9Nkt';

  private _threadMessagesListEvent = new BehaviorSubject<ChatMessageDto[]>([]);
  listThreadMessages$ = this._threadMessagesListEvent.asObservable();

  constructor(private _http: HttpClient) {}

  sendMessage(message: string): Observable<IRequestResponse<any>> {
    const data: ChatMessageDto = {
      message: message,
      threadId: this._currentThread,
      assistantId: this._currentAssistant,
      role: 'user',
    };
    return this._http
      .post<IRequestResponse<any>>(this.baseUrl + '/user-new-message', data)
      .pipe(
        tap((r) => {
          if (r.success) {
            this._currentThread = r.data.threadId;
          }
        })
      );
  }

  listThreadMessages(threadId: string): Observable<IRequestResponse<any>> {

    const params = new HttpParams().append(
      'threadId',
      threadId
    );
    return this._http.get<IRequestResponse<any>>(
      this.baseUrl + '/list-thread-messages',
      { params }
    ).pipe(tap(r => {
      if (r.success) {
        this._threadMessagesListEvent.next(r.data!)
      }
    }));
  }

  listThreadHistory(): Observable<IRequestResponse<ChatThreadDto[]>> {
    return this._http.get<any>(this.baseUrl + '/list-threads');
  }
}
