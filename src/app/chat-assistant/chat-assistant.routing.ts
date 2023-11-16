import { Routes } from '@angular/router';
import { ChatAssistantHomeComponent } from './components/chat-assistant-home/chat-assistant-home.component';
import { ChatAssistantPresentationComponent } from './components/chat-assistant-presentation/chat-assistant-presentation.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';

export const ChatAssistantRoutes: Routes = [
  {
    path: '',
    component: ChatAssistantHomeComponent,
    children: [
      {
        path: 'a/:assistantId',
        component: ChatAssistantPresentationComponent,
        pathMatch: 'full'
      },
      {
        path: 'a/:assistantId/t/:threadId',
        component: ChatHistoryComponent,
        pathMatch: 'full'
      },
    ]
  },
];