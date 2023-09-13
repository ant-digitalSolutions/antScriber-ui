import { Component, Input } from '@angular/core';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { ArticleService } from 'src/app/blogger/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-articles-cards',
  templateUrl: './list-articles-cards.component.html',
  styleUrls: ['./list-articles-cards.component.scss']
})
export class ListArticlesCardsComponent {
editArticle(_t4: IArticleDetailsDto) {
throw new Error('Method not implemented.');
}

  @Input()
  articlesToRender: IArticleDetailsDto[] = [];

  constructor(private articleService: ArticleService) {

  }

  selectArticle(article: IArticleDetailsDto) {
    this.articleService.navigateToGenerateFullArticle(article)
  }

  imageFullPath(article: IArticleDetailsDto): string {
    return environment.apiUrl + article.featureImagePath;
  }
}
