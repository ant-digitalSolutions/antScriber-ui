import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

export const ContentCreationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'chat',
                component: ChatComponent,
            }
           
        ],
    },
];