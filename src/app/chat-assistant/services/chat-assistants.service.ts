import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ChatAssistantListItemDto } from '../dtos/chat-assistant-list-item.dto';
import { ChatAssistantDto } from '../dtos/chat-assistant.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatAssistantsService {
  baseUrl = getBaseApiURL() + 'chat-assistants';

  _currentAssistant: string = 'asst_Dy9FXW6cFyJRCqDS2R5V9Nkt';

  _chatAssistants?: ChatAssistantListItemDto[];

  _currentAssistantData: ChatAssistantDto;

  private _userAssistantsListEvent = new BehaviorSubject<
    ChatAssistantListItemDto[] | undefined
  >(undefined);
  threadHistory$ = this._userAssistantsListEvent.asObservable();

  private _selectedAssistantDataEvent = new BehaviorSubject<
    ChatAssistantDto | undefined
  >(undefined);
  selectedAssistantDataObservable$ = this._selectedAssistantDataEvent.asObservable();

  private _chatAssistantId?: string;

  constructor(private _http: HttpClient) {}

  listAssistantsForCurrentUser(): Observable<
    IRequestResponse<ChatAssistantListItemDto[]>
  > {
    return this._http.get<any>(this.baseUrl + '/list-for-user').pipe(
      tap((r) => {
        if (r.success) {
          this._userAssistantsListEvent.next(r.data);
          this._chatAssistants = r.data;
        }
      })
    );
  }

  getAssistant(
    
  ): Observable<IRequestResponse<ChatAssistantDto>> {
    if (!this.assistantId) {
      throw new Error('The Assistant Id is not set in the route params')
    }
    const params = new HttpParams().append('assistantId', this.assistantId);
    return this._http.get<any>(this.baseUrl, { params }).pipe(tap(r => {
      if (r.success) {
        this._currentAssistantData = r.data!;
        this._selectedAssistantDataEvent.next(r.data)
      }
    }));
  }

 setAssistantId(assistantId: string): void {
  this._chatAssistantId = assistantId;
 }

  public get assistantId() : string | undefined {
    return this._chatAssistantId;
  }


}
