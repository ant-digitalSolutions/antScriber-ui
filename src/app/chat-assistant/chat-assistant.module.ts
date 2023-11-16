import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { ChatAssistantRoutes } from './chat-assistant.routing';
import { ChatAssistantHomeComponent } from './components/chat-assistant-home/chat-assistant-home.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatListSidebarComponent } from './components/chat-list-sidebar/chat-list-sidebar.component';

import { MarkdownModule } from 'ngx-markdown';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';



@NgModule({
  declarations: [
    ChatAssistantHomeComponent,
    ChatListSidebarComponent,
    ChatHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ChatAssistantRoutes),
    SharedModule,
    MarkdownModule.forRoot(),
  ]
})
export class ChatAssistantModule { }
