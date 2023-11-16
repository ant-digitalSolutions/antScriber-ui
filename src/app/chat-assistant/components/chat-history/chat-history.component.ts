import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessageDto } from '../../dtos/message.dto';
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

  constructor(private _chatThreadService: ChatThreadsService) {}

  ngOnInit(): void {
    this.setListeners()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    // this._chatAssistant.listThreadMessages$.pipe(takeUntil(this.componentDestroyed$))
    // .subscribe(messages => {
    //   this.chatHistory = messages;
    // })
  }

  
  public get chatMessages() : ChatMessageDto[] {
    return this._chatThreadService.chatMessages;
  }
  

 
}
