import { Component, OnInit } from '@angular/core';
import { ChatThreadDto } from '../../dtos/chat-thread.dto';
import { ChatAssistantService } from '../../services/chat-assistant.service';

@Component({
  selector: 'app-chat-list-sidebar',
  templateUrl: './chat-list-sidebar.component.html',
  styleUrls: ['./chat-list-sidebar.component.scss'],
})
export class ChatListSidebarComponent implements OnInit {

  previousChats: string[] = ['Chat 1', 'Chat 2', 'Chat 3'];

  _chatThreads: ChatThreadDto[] | undefined;

  constructor(private _chatService: ChatAssistantService) {}

  ngOnInit(): void {
    this.listThreadHistory()
  }

  listThreadHistory() {
    this._chatService.listThreadHistory().subscribe((r) => {
      if (r.success) {
        this._chatThreads = r.data;
      }
    });
  }

  selectThread(chatThread: ChatThreadDto) {
    this._chatService.selectThread(chatThread).subscribe(r => {
      if (r.success) {
        console.log(r.data)
      }
    })
    }
  
  public get chatThreadsNames() : string[] | undefined {
    return this._chatThreads?.map(t => t.threadName);
  }
  
}
