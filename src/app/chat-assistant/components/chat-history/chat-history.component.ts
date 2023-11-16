import { Component, OnInit } from '@angular/core';
import { ChatAssistantService } from '../../services/chat-assistant.service';

interface ChatMessage {
  sender: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
})
export class ChatHistoryComponent implements OnInit {
  onCopyToClipboard() {
    console.log('copied');
  }
  chatHistory: ChatMessage[] = [
    {
      sender: 'assistant',
      content: 'How can I assist you today?',
    },
  ];
  newMessage: string = '';

  constructor(private _chatAssistant: ChatAssistantService) {}

  ngOnInit(): void {
    // Load chat history from a service or local storage
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatHistory.push({ sender: 'user', content: this.newMessage });

      this._chatAssistant.sendMessage(this.newMessage.trim()).subscribe((r) => {
        if (r.success) {
          // const htmlCode = marked.parse(r.data.message)
          this.chatHistory.push({
            sender: 'assistant',
            content: r.data.message,
          });
        }
      });
      this.newMessage = '';
    }
  }
}
