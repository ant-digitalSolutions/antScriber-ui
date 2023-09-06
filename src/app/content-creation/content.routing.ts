import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GenerateArticleFromUserParamsComponent } from './article/generate-article-from-user-params/generate-article-from-user-params.component';
import { GenerateArticleIdeasComponent } from './article/generate-article-ideas/generate-article-ideas.component';

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
            },
            {

                path: 'generate-ideas-for-articles',
                component: GenerateArticleIdeasComponent
            }
           
        ],
    },
];