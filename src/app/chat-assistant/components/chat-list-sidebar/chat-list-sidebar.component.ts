import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list-sidebar',
  templateUrl: './chat-list-sidebar.component.html',
  styleUrls: ['./chat-list-sidebar.component.scss']
})
export class ChatListSidebarComponent implements OnInit {

  previousChats: string[] = ['Chat 1', 'Chat 2', 'Chat 3'];

  constructor() { }

  ngOnInit(): void {
    // Load previous chats from a service or local storage
  }

}
