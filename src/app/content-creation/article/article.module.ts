import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRenderComponent } from './article-render/article-render.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleService } from '../../blogger/services/article.service';
import { GenerateArticleFromUserParamsComponent } from './generate-article-from-user-params/generate-article-from-user-params.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgxEditorModule } from 'ngx-editor';
import { GenerateArticleIdeasComponent } from './article-ideas/generate-article-ideas/generate-article-ideas.component';
import { ArticleIdeaCardComponent } from './article-ideas/article-idea-card/article-idea-card.component';
import { ListArticleIdeasComponent } from './article-ideas/list-article-ideas/list-article-ideas.component';
import { ArticleIdeasModule } from './article-ideas/article-ideas.module';
import { BloggerModule } from 'src/app/blogger/blogger.module';




@NgModule({
  declarations: [
    ArticleRenderComponent,
    ArticleEditorComponent,
    GenerateArticleFromUserParamsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    TablerIconsModule.pick(TablerIcons),
    ReactiveFormsModule,
    NgxEditorModule,
    ArticleIdeasModule,
    BloggerModule,
  ]
})
export class ArticleModule { }
