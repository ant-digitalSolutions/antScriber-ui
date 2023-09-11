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
import { MatChipsModule } from '@angular/material/chips';
import { GenerateFullArticleForBlogTextFieldComponent } from './generate-full-article-for-blog-text-field/generate-full-article-for-blog-text-field.component';
import { SecondaryKeywordsSelectorComponent } from './articles/keywords-selector/secondary-keywords-selector.component';



@NgModule({
  declarations: [
    CreateBlogProjectComponent,
    ListBlogProjectsComponent,
    GenerateFullArticleForBlogComponent,
    GenerateFullArticleForBlogTextFieldComponent,
    SecondaryKeywordsSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(BloggerRouting),
    MatChipsModule,
  ],
  exports: [
    SecondaryKeywordsSelectorComponent
  ]
})
export class BloggerModule { }
