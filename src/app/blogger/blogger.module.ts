import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlogProjectComponent } from './create-blog-project/create-blog-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { BloggerRouting } from './blogger.routing';
import { ListBlogProjectsComponent } from './list-blog-projects/list-blog-projects.component';
import { GenerateFullArticleForBlogComponent } from './generate-full-article-for-blog/generate-full-article-for-blog.component';



@NgModule({
  declarations: [
    CreateBlogProjectComponent,
    ListBlogProjectsComponent,
    GenerateFullArticleForBlogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(BloggerRouting)
  ]
})
export class BloggerModule { }
