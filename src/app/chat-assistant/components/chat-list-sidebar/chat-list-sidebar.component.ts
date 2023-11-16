import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatAssistantDto } from '../../dtos/chat-assistant.dto';
import { ChatThreadDto } from '../../dtos/chat-thread.dto';
import { ChatAssistantsService } from '../../services/chat-assistants.service';
import { ChatThreadsService } from '../../services/chat-threads.service';

@Component({
  selector: 'app-chat-list-sidebar',
  templateUrl: './chat-list-sidebar.component.html',
  styleUrls: ['./chat-list-sidebar.component.scss'],
})
export class ChatListSidebarComponent implements OnInit {
  _chatThreads: ChatThreadDto[] | undefined;

  _chatAssistants?: ChatAssistantDto[];

  loadingAssistant = true;
  loadingThreads: boolean;

  constructor(
    private _chatService: ChatThreadsService,
    private _chatAssistantService: ChatAssistantsService,
    private _router: Router,
    // private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listThreadHistory();
    this.listUserAssistants();
  }

  listThreadHistory() {
    this.loadingThreads = true;
    this._chatService.listThreadHistory().subscribe((r) => {
      if (r.success) {
        this._chatThreads = r.data;
      }

      this.loadingThreads = false;
    });
  }

  listUserAssistants() {
    this.loadingAssistant = true;
    this._chatAssistantService.listAssistantsForCurrentUser().subscribe((r) => {
      if (r.success) {
        this._chatAssistants = r.data;
      }

      this.loadingAssistant = false;
    });
  }

  selectThread(chatThread: ChatThreadDto) {
    // TODO: change this logic, to update the url params
    // so the chat History component get the threadId
    // this._chatService.selectThread(chatThread).subscribe();
    this._router.navigate(['chat-assistant',chatThread.openaiAssistantId, chatThread.openaiThreadId]);

  }

  selectAssistant(assistant: ChatAssistantDto) {
    // Navigate to the route for the selected assistant using its UUID
    // const url = this._router.createUrlTree(['', assistant.uuid], { relativeTo: this._route });
    this._router.navigate(['chat-assistant',assistant.openaiAssistantId]);
  }

  public get chatThreadsNames(): string[] | undefined {
    return this._chatThreads?.map((t) => t.threadName);
  }
}
