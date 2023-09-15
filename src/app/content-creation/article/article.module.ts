import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateArticleFromUserParamsComponent } from './generate-article-from-user-params/generate-article-from-user-params.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/material.module';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ArticleIdeasModule } from './article-ideas/article-ideas.module';
import { BloggerModule } from 'src/app/blogger/blogger.module';
import { KeywordsModule } from 'src/app/keywords/keywords.module';




@NgModule({
  declarations: [
    GenerateArticleFromUserParamsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    TablerIconsModule.pick(TablerIcons),
    ReactiveFormsModule,
    ArticleIdeasModule,
    BloggerModule,
    KeywordsModule
  ]
})
export class ArticleModule { }
