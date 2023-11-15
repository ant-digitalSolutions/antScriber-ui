import { Component, OnInit } from '@angular/core';

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
  chatHistory: ChatMessage[] = [
    { sender: 'user', content: 'Hello, how are you?' },
    {
      sender: 'assistant',
      content: 'I am good, thank you! How can I assist you today?',
    },
  ];
  newMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Load chat history from a service or local storage
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatHistory.push({ sender: 'user', content: this.newMessage });
      this.mockAssistantResponse(this.newMessage);
      this.newMessage = '';
    }
  }

  private mockAssistantResponse(userMessage: string): void {
    const mockResponse = `Received your message: "${userMessage}"`;
    setTimeout(() => {
      this.chatHistory.push({ sender: 'assistant', content: mockResponse });
    }, 1000);
  }
}
