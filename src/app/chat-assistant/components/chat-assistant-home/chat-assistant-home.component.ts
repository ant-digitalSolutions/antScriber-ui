import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatParamsEnum } from '../../enums/chat-route-params.enum';
import { ChatAssistantsService } from '../../services/chat-assistants.service';
import { ChatThreadsService } from '../../services/chat-threads.service';

@Component({
  selector: 'app-chat-assistant-home',
  templateUrl: './chat-assistant-home.component.html',
  styleUrls: ['./chat-assistant-home.component.scss'],
})
export class ChatAssistantHomeComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  constructor(
    private _route: ActivatedRoute,
    private _chatThreadService: ChatThreadsService,
    private _chatAssistantService: ChatAssistantsService
  ) {}

  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  setListeners() {
    this._route.params
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => {
        if (params) {
          if (params[ChatParamsEnum.ThreadId]) {
            this.isLoading = true;
            this._chatAssistantService.setAssistantId(params[ChatParamsEnum.AssistantId])
            this._chatThreadService.setThreadId(params[ChatParamsEnum.ThreadId])
            this._chatThreadService.listThreadMessages().subscribe(() => {
              this.isLoading = false;
            });
          }
          else if (params[ChatParamsEnum.AssistantId]) {
            this.isLoading = true;
            this._chatThreadService.setThreadId(undefined);
            this._chatAssistantService.setAssistantId(params[ChatParamsEnum.AssistantId])
            this._chatAssistantService.getAssistant().subscribe(() => {
              this.isLoading = false;
            })
          }
       
        }
      });
  }


  public get showThreadMessages() : boolean {
    return this._chatThreadService.threadId != null;
  }

  
  public get showAssistantPresentation() : boolean {
    return this._chatAssistantService.assistantId != null && this._chatThreadService.threadId == null;
  }

  
  public get assistantId() : string | undefined {
    return this._chatAssistantService.assistantId;
  }
}
