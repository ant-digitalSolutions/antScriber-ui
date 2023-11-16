import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
  chatHistory: ChatMessageDto[] = [
    {
      role: 'assistant',
      message: 'How can I assist you today?',
    },
  ];
  newMessage: string = '';

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  constructor(private _chatAssistant: ChatThreadsService) {}

  ngOnInit(): void {
    this.setListeners()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._chatAssistant.listThreadMessages$.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(messages => {
      this.chatHistory = messages;
    })
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatHistory.push({ role: 'user', message: this.newMessage });

      this._chatAssistant.sendMessage(this.newMessage.trim()).subscribe((r) => {
        if (r.success) {
          // const htmlCode = marked.parse(r.data.message)
          this.chatHistory.push({
            role: 'assistant',
            message: r.data.message,
          });
        }
      });
      this.newMessage = '';
    }
  }
}
