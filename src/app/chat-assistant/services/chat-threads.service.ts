import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ChatThreadDto } from '../dtos/chat-thread.dto';
import { ChatMessageDto } from '../dtos/message.dto';
import { ChatAssistantsService } from './chat-assistants.service';

@Injectable({
  providedIn: 'root',
})
export class ChatThreadsService {
  baseUrl = getBaseApiURL() + 'chat-threads';

  _chatMessages: ChatMessageDto[] = [];

  private _chatThreadId?: string;

  private _threadMessagesListEvent = new BehaviorSubject<ChatMessageDto[]>([]);
  listThreadMessages$ = this._threadMessagesListEvent.asObservable();

  constructor(
    private _http: HttpClient,
    private _chatAssistantService: ChatAssistantsService,
    private _router: Router,
  ) {}

  sendMessage(message: string): Observable<IRequestResponse<any>> {
    const data: ChatMessageDto = {
      message: message,
      threadId: this.threadId,
      assistantId: this.assistantId,
      role: 'user',
    };

    // if it's the first message of the thread, clean previous chat messages
    if (!this.threadId) {
      this._chatMessages = [];
    }
    this._chatMessages.push(data);

    return this._http
      .post<IRequestResponse<ChatMessageDto>>(
        this.baseUrl + '/user-new-message',
        data
      )
      .pipe(
        tap((r) => {
          if (r.success) {
            this.handleMessageResponse(r.data!)
          }
        })
      );
  }

  listThreadMessages(threadId: string): Observable<IRequestResponse<any>> {
    if (this.threadId && this.threadId === threadId) {
      return of(undefined as any);
    }

    this.setThreadId(threadId);

    const params = new HttpParams().append('threadId', this.threadId!);
    return this._http
      .get<IRequestResponse<any>>(this.baseUrl + '/list-thread-messages', {
        params,
      })
      .pipe(
        tap((r) => {
          if (r.success) {
            this._threadMessagesListEvent.next(r.data!);
            this._chatMessages = r.data!;
          }
        })
      );
  }

  handleMessageResponse(chatMessage: ChatMessageDto) {
    this._chatMessages.push(chatMessage);

    if (!this.threadId) {
      this.setThreadId(chatMessage.threadId);
      this._router.navigate([
        'chat-assistant',
        'a',
        this.assistantId,
        't',
        this.threadId,
      ]);
    }
  }

  listThreadHistory(): Observable<IRequestResponse<ChatThreadDto[]>> {
    return this._http.get<any>(this.baseUrl + '/list-threads');
  }

  setThreadId(threadId: string | undefined) {
    this._chatThreadId = threadId;
  }

  public get chatMessages(): ChatMessageDto[] {
    return this._chatMessages;
  }

  public get threadId(): string | undefined {
    return this._chatThreadId;
  }

  public get assistantId(): string | undefined {
    return this._chatAssistantService.assistantId;
  }
}
