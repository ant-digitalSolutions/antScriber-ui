import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ChatMessageDto } from '../dtos/message.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatAssistantService {
  baseUrl = getBaseApiURL() + 'chat-assistant';

  _currentThread: string;

  _currentAssistant: string = 'asst_Dy9FXW6cFyJRCqDS2R5V9Nkt';

  constructor(private _http: HttpClient) {}

  sendMessage(message: string): Observable<IRequestResponse<any>> {
    const data: ChatMessageDto = {
      message: message,
      threadId: this._currentThread,
      assistantId: this._currentAssistant,
      role: 'user',
    };
    return this._http.post<IRequestResponse<any>>(
      this.baseUrl + '/user-new-message',
      data
    ).pipe(tap(r => {
      if (r.success) {
        this._currentThread = r.data.threadId
      }
    }));
  }
}
