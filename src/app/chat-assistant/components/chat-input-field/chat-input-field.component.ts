import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatThreadsService } from '../../services/chat-threads.service';

@Component({
  selector: 'app-chat-input-field',
  templateUrl: './chat-input-field.component.html',
  styleUrls: ['./chat-input-field.component.scss']
})
export class ChatInputFieldComponent {

  newMessage: string = '';

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  constructor(private _chatAssistant: ChatThreadsService) {}

  sendMessage(): void {
    this.isLoading = true;
    if (this.newMessage.trim()) {

      this._chatAssistant.sendMessage(this.newMessage.trim()).subscribe((r) => {
        if (r.success) {
          // const htmlCode = marked.parse(r.data.message)
        
        }
      });
      this.isLoading = false;
    }
  }
}
