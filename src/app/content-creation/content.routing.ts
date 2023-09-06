import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GenerateArticleFromUserParamsComponent } from './article/generate-article-from-user-params/generate-article-from-user-params.component';

export const ContentCreationRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'chat',
                component: ChatComponent,
            },
            {
                path: 'generate-article-from-params',
                component: GenerateArticleFromUserParamsComponent
            }
           
        ],
    },
];