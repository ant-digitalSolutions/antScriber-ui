import { Component, Input } from '@angular/core';
import { IArticleFromAiResponseDto } from '../../../content-creation/article/dtos/article-from-ai.dto';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';

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
  articleToRender: IArticleDetailsDto;

  editArticle() {
    this.inEditionMode = true;
  }

  saveArticleChanges(article: IArticleDetailsDto) {
    this.articleToRender = article;
    this.inEditionMode = false;
  }
}
