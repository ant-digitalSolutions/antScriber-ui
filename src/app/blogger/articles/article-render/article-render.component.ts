import { Component, Input } from '@angular/core';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';

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

  imageFullPath(): string {
    return getBaseApiURL() + this.articleToRender.featureImagePath;
  }
  saveArticleChanges(article: IArticleDetailsDto) {
    this.articleToRender = article;
    this.inEditionMode = false;
  }
}
