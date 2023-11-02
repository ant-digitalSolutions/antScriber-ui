import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgxEditorModule } from 'ngx-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { KeywordsModule } from 'src/app/keywords/keywords.module';
import { MaterialModule } from 'src/app/material.module';
import { ArticleIdeaCardComponent } from './article-idea-card/article-idea-card.component';
import { GenerateArticleIdeasComponent } from './generate-article-ideas/generate-article-ideas.component';
import { ListArticleIdeasComponent } from './list-article-ideas/list-article-ideas.component';




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
    KeywordsModule,
  ]
})
export class ArticleIdeasModule { }
