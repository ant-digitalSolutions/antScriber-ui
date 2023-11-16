import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatAssistantsService } from '../../services/chat-assistants.service';
import { ChatThreadsService } from '../../services/chat-threads.service';

// chat-assistant-home.component.ts
interface ChatMessage {
  sender: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat-assistant-home',
  templateUrl: './chat-assistant-home.component.html',
  styleUrls: ['./chat-assistant-home.component.scss'],
})
export class ChatAssistantHomeComponent implements OnInit {
  previousChats: string[] = ['Chat 1', 'Chat 2', 'Chat 3'];
  chatHistory: ChatMessage[] = [
    { sender: 'user', content: 'Hello, how are you?' },
    {
      sender: 'assistant',
      content: 'I am good, thank you! How can I assist you today?',
    },
  ];
  newMessage: string = '';

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  private _assistantId?: string;
  private _threadId?: string;

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
          if (params['threadId']) {
            this._threadId = params['threadId'];
            this._chatThreadService.listThreadMessages(this._threadId!).subscribe();
          }
          if (params['assistantId']) {
            this._assistantId = params['assistantId'];
            this._chatAssistantService._currentAssistant = this._assistantId!;
            // this._chatAssistantService.getAssistant(this._assistantId!).subscribe(r => {
            //   this.isLoading = false;
            // })
          }
       
        }
      });
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

  
  public get showThreadMessages() : boolean {
    return this._threadId != undefined;
  }

  
  public get showAssistantPresentation() : boolean {
    return this._assistantId != undefined && this._threadId == undefined;
  }

  
  public get assistantId() : string {
    return this._assistantId!;
  }
  
  
  
}
