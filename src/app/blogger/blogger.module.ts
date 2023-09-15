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
import { ListArticlesInTableComponent } from './articles/articles-list/list-articles-in-table/list-articles-in-table.component';
import { ArticleEditorComponent } from './articles/article-editor/article-editor.component';
import { ArticleRenderComponent } from './articles/article-render/article-render.component';
import { NgxEditorModule } from 'ngx-editor';
import { ArticleFaqScriptRenderComponent } from './articles/article-faq-script-render/article-faq-script-render.component';
import { ArticleUploadFeatureImageComponent } from './articles/article-upload-feature-image/article-upload-feature-image.component';
import { ListArticlesCardsComponent } from './articles/articles-list/list-articles-cards/list-articles-cards.component';
import { ListArticlesComponent } from './articles/articles-list/list-articles/list-articles.component';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { KeywordsModule } from '../keywords/keywords.module';



@NgModule({
  declarations: [
    CreateBlogProjectComponent,
    ListBlogProjectsComponent,
    GenerateFullArticleForBlogComponent,
    GenerateFullArticleForBlogTextFieldComponent,
    ListArticlesInTableComponent,
    ArticleRenderComponent,
    ArticleEditorComponent,
    ArticleFaqScriptRenderComponent,
    ArticleUploadFeatureImageComponent,
    ListArticlesCardsComponent,
    ListArticlesComponent,
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
    TablerIconsModule.pick(TablerIcons),
    TablerIconsModule,
    KeywordsModule
  ],
  exports: [
    ArticleRenderComponent,
    ArticleEditorComponent
  ]
})
export class BloggerModule { }
