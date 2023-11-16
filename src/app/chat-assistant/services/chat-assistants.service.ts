import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ChatAssistantDto } from '../dtos/chat-assistant.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatAssistantsService {
  baseUrl = getBaseApiURL() + 'chat-assistants';

  _currentAssistant: string = 'asst_Dy9FXW6cFyJRCqDS2R5V9Nkt';

  _chatAssistants?: ChatAssistantDto[];

  private _userAssistantsListEvent = new BehaviorSubject<ChatAssistantDto[] | undefined>(undefined);
  listThreadMessages$ = this._userAssistantsListEvent.asObservable();

  constructor(private _http: HttpClient) {}

  listAssistantsForCurrentUser(): Observable<IRequestResponse<ChatAssistantDto[]>> {
    return this._http.get<any>(this.baseUrl + '/list-for-user').pipe(
      tap((r) => {
        if (r.success) {
          this._userAssistantsListEvent.next(r.data);
          this._chatAssistants = r.data;
        }
      })
    );
  }

  selectAssistant(assistantUUID: string) {
    this._currentAssistant = assistantUUID;
  }
}
