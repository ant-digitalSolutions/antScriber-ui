import { Routes } from '@angular/router';
import { CreateBlogProjectComponent } from './create-blog-project/create-blog-project.component';
import { ListBlogProjectsComponent } from './list-blog-projects/list-blog-projects.component';
import { GenerateFullArticleForBlogComponent } from './generate-full-article-for-blog/generate-full-article-for-blog.component';

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
                path: 'create-full/:id',
                component: GenerateFullArticleForBlogComponent,
            }

        ],
    },
];