import { Routes } from '@angular/router';
import { GenerateArticleIdeasComponent } from './article/article-ideas/generate-article-ideas/generate-article-ideas.component';
import { ListArticleIdeasComponent } from './article/article-ideas/list-article-ideas/list-article-ideas.component';
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
    {
        path: 'article-ideas',
        children: [
            {

                path: 'create',
                component: GenerateArticleIdeasComponent
            },
            {

                path: 'list',
                component: ListArticleIdeasComponent
            }
        ]
    },
];