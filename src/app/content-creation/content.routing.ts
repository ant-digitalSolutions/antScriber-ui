import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ArticleFromIdeaComponent } from './article-from-idea/article-from-idea.component';

export const ContentCreationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'chat',
                component: ChatComponent,
            },
            {
                path: 'article-from-idea',
                component: ArticleFromIdeaComponent
            }
           
        ],
    },
];