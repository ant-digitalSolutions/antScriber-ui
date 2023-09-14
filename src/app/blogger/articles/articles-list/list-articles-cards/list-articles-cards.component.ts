import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { ArticleService } from 'src/app/blogger/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-articles-cards',
  templateUrl: './list-articles-cards.component.html',
  styleUrls: ['./list-articles-cards.component.scss']
})
export class ListArticlesCardsComponent implements OnChanges {


  @Input()
  articlesToRender: IArticleDetailsDto[] = [];

  articleSelected: { articleId: number, isSelected: boolean }[];

  constructor(private articleService: ArticleService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articlesToRender']) {
      this.articleSelected = [];
      for (let i = 0; i < this.articlesToRender.length; i++) {
        this.articleSelected.push({
          articleId: this.articlesToRender[i].id,
          isSelected: false
        })

      }
    }
  }

  selectArticle(article: IArticleDetailsDto) {
    this.articleSelected.forEach(a => {
      if (a.articleId === article.id) {
        a.isSelected = true;
      } else {
        a.isSelected = false;
      }
    });

    // const elements = document.getElementById(`article-card-${article.id}`);
    // if (elements) {
    //   setTimeout(() => {
    //     elements.scrollIntoView();
    //   }, 200)
    // }


  }

  editArticle(article: IArticleDetailsDto) {
    this.articleService.navigateToGenerateFullArticle(article)

  }

  imageFullPath(article: IArticleDetailsDto): string {
    return environment.apiUrl + article.featureImagePath;
  }


}
