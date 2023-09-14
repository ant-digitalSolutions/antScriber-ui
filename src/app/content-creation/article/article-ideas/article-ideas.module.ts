import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleIdeaCardComponent } from './article-idea-card/article-idea-card.component';
import { GenerateArticleIdeasComponent } from './generate-article-ideas/generate-article-ideas.component';
import { ListArticleIdeasComponent } from './list-article-ideas/list-article-ideas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgxEditorModule } from 'ngx-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { BloggerModule } from 'src/app/blogger/blogger.module';




@NgModule({
  declarations: [
    GenerateArticleIdeasComponent,
    ArticleIdeaCardComponent,
    ListArticleIdeasComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    TablerIconsModule.pick(TablerIcons),
    ReactiveFormsModule,
    NgxEditorModule,
    BloggerModule
  ]
})
export class ArticleIdeasModule { }
