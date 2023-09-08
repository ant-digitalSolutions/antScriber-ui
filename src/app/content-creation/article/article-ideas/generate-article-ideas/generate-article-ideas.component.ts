import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../article.service';
import { ArticleIdeasParamsDto } from '../../../dto/generate-articles-ideas-params.dto';
import { ArticleIdeasResponse } from '../../dtos/article-ideas-from-ai.dto';

@Component({
  selector: 'app-generate-article-ideas',
  templateUrl: './generate-article-ideas.component.html',
  styleUrls: ['./generate-article-ideas.component.scss']
})
export class GenerateArticleIdeasComponent {

  constructor(private articleService: ArticleService) {
  }

  isLoading = false;

  articleIdeas: ArticleIdeasResponse;

  maxAmountOfIdeas = 5;
  keysForSelectorElement = [...Array(this.maxAmountOfIdeas).keys()];

  articleCreationForm = new FormGroup({
    shortDescription: new FormControl('How to offer WebDesign services to local business and how this can be of great value for them', [Validators.required, Validators.minLength(50)]),
    amountOfIdeas: new FormControl(3),
    blogName: new FormControl('ANT - Creative Solutions'),
    primaryKeyword: new FormControl('web design'),
    secondaryKeywords: new FormControl('marketing, business, solutions'),
  })



  generateArticleIdeas() {
    this.isLoading = true;
    console.log(this.articleCreationForm.value);

    const articleCreationParams = new ArticleIdeasParamsDto(this.articleCreationForm.value as any);

    this.articleService.generateArticleIdeas(articleCreationParams).subscribe(result => {
      this.isLoading = false;
      this.articleIdeas = new ArticleIdeasResponse(result);
      console.log(result);
    })
  }

}
