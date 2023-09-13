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
import { PrimaryKeywordSelectorComponent } from './articles/primary-keyword-selector/primary-keyword-selector.component';
import { ListArticlesInTableComponent } from './articles/list-articles-in-table/list-articles-in-table.component';
import { ArticleEditorComponent } from './articles/article-editor/article-editor.component';
import { ArticleRenderComponent } from './articles/article-render/article-render.component';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [
    CreateBlogProjectComponent,
    ListBlogProjectsComponent,
    GenerateFullArticleForBlogComponent,
    GenerateFullArticleForBlogTextFieldComponent,
    SecondaryKeywordsSelectorComponent,
    PrimaryKeywordSelectorComponent,
    ListArticlesInTableComponent,
    ArticleRenderComponent,
    ArticleEditorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(BloggerRouting),
    MatChipsModule,
    NgxEditorModule,
  ],
  exports: [
    SecondaryKeywordsSelectorComponent,
    PrimaryKeywordSelectorComponent,
    ArticleRenderComponent,
    ArticleEditorComponent,
  ]
})
export class BloggerModule { }
