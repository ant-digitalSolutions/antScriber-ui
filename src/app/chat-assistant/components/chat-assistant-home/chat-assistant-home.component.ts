import { Component, OnInit } from '@angular/core';


// chat-assistant-home.component.ts
interface ChatMessage {
  sender: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat-assistant-home',
  templateUrl: './chat-assistant-home.component.html',
  styleUrls: ['./chat-assistant-home.component.scss']
})
export class ChatAssistantHomeComponent implements OnInit {

  previousChats: string[] = ['Chat 1', 'Chat 2', 'Chat 3'];
  chatHistory: ChatMessage[] = [
    { sender: 'user', content: 'Hello, how are you?' },
    { sender: 'assistant', content: 'I am good, thank you! How can I assist you today?' }
  ];
  newMessage: string = '';

  constructor() { }

  ngOnInit(): void {
    // Normally, load previous chats and chat history from a service or local storage
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatHistory.push({ sender: 'user', content: this.newMessage });
      // Mock response from the assistant
      this.mockAssistantResponse(this.newMessage);
      this.newMessage = '';
    }
  }

  private mockAssistantResponse(userMessage: string): void {
    // Mock the response logic
    const mockResponse = `Received your message: "${userMessage}"`;
    setTimeout(() => {
      this.chatHistory.push({ sender: 'assistant', content: mockResponse });
    }, 1000); // Simulate response delay
  }

}
