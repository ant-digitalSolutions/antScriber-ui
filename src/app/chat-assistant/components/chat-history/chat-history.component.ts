import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatMessageDto } from '../../dtos/message.dto';
import { ChatParamsEnum } from '../../enums/chat-route-params.enum';
import { ChatAssistantsService } from '../../services/chat-assistants.service';
import { ChatThreadsService } from '../../services/chat-threads.service';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
})
export class ChatHistoryComponent implements OnInit, OnDestroy {
  onCopyToClipboard() {
    console.log('copied');
  }


  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  constructor(private _chatThreadService: ChatThreadsService, private _route: ActivatedRoute, private _chatAssistantService: ChatAssistantsService) {}

  ngOnInit(): void {
    this.setListeners()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._route.params
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((params) => {
      if (params) {
        if (params[ChatParamsEnum.ThreadId]) {
          this.isLoading = true;
          this._chatAssistantService.setAssistantId(params[ChatParamsEnum.AssistantId])
          // this._chatThreadService.setThreadId(params[ChatParamsEnum.ThreadId])
          this._chatThreadService.listThreadMessages(params[ChatParamsEnum.ThreadId]).subscribe(() => {
            this.isLoading = false;
          });
        }
      }
    });
  }

  
  public get chatMessages() : ChatMessageDto[] {
    return this._chatThreadService.chatMessages;
  }
  

 
}
