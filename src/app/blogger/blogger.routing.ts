import { Routes } from '@angular/router';
import { CreateBlogProjectComponent } from './create-blog-project/create-blog-project.component';
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
];