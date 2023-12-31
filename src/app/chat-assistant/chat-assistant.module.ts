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
import { ChatAssistantPresentationComponent } from './components/chat-assistant-presentation/chat-assistant-presentation.component';
import { ChatInputFieldComponent } from './components/chat-input-field/chat-input-field.component';
import { ChatInputService } from './services/chat-input.service';



@NgModule({
  declarations: [
    ChatAssistantHomeComponent,
    ChatListSidebarComponent,
    ChatHistoryComponent,
    ChatAssistantPresentationComponent,
    ChatInputFieldComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ChatAssistantRoutes),
    SharedModule,
    MarkdownModule.forRoot(),
  ],
  providers: [ChatInputService]
})
export class ChatAssistantModule { }
