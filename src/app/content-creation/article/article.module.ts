import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRenderComponent } from './article-render/article-render.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleService } from './article.service';



@NgModule({
  declarations: [
    ArticleRenderComponent,
    ArticleEditorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ArticleService]
})
export class ArticleModule { }
