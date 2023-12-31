import { Routes } from '@angular/router';
import { GenerateArticleFromUserParamsComponent } from '../content-creation/article/generate-article-from-user-params/generate-article-from-user-params.component';
import { ListArticlesComponent } from './articles/articles-list/list-articles/list-articles.component';
import { CreateBlogProjectComponent } from './create-blog-project/create-blog-project.component';
import { GenerateFullArticleForBlogComponent } from './generate-full-article-for-blog/generate-full-article-for-blog.component';
import { ListBlogProjectsComponent } from './list-blog-projects/list-blog-projects.component';

export const BloggerRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'projects/create',
                component: CreateBlogProjectComponent,
            },
            {
                path: 'projects/list',
                component: ListBlogProjectsComponent,
            }

        ],
    },
    {
        path: 'articles',
        children: [
            {
                path: 'generate',
                component: GenerateArticleFromUserParamsComponent
            },
            {

                path: 'list',
                component: ListArticlesComponent
            },
            {
                path: 'create-full/:id',
                component: GenerateFullArticleForBlogComponent,
            }

        ],
    },
];