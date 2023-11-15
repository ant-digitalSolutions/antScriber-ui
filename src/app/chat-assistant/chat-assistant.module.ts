import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ChatAssistantRoutes } from './chat-assistant.routing';
import { ChatAssistantHomeComponent } from './components/chat-assistant-home/chat-assistant-home.component';
import { ChatListSidebarComponent } from './components/chat-list-sidebar/chat-list-sidebar.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';



@NgModule({
  declarations: [
    ChatAssistantHomeComponent,
    ChatListSidebarComponent,
    ChatHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ChatAssistantRoutes),
    SharedModule
  ]
})
export class ChatAssistantModule { }
