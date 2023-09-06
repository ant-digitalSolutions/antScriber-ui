import { Component, Input } from '@angular/core';
import { IArticleFromAiResponseDto } from '../dtos/article-from-ai.dto';

@Component({
  selector: 'app-article-render',
  templateUrl: './article-render.component.html',
  styleUrls: ['./article-render.component.scss']
})
export class ArticleRenderComponent {

  /**
   * True if the user is editing the Article,
   * otherwise false.
   *
   * @memberof ArticleRenderComponent
   */
  inEditionMode = false;

  @Input()
  articleToRender: IArticleFromAiResponseDto;

  editArticle() {
    this.inEditionMode = true;
  }

  saveArticleChanges(article: IArticleFromAiResponseDto) {
    this.articleToRender = article;
    this.inEditionMode = false;
  }
}
