import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleGenerationParamsDto } from '../../dto/generate-article.dto';
import { ArticleService } from '../article.service';
import { IArticleFromAiResponseDto } from '../dtos/article-from-ai.dto';
import { ArticleIdeasParamsDto } from '../../dto/generate-articles-ideas-params.dto';
import { ArticleIdeasResponse } from '../dtos/article-ideas-from-ai.dto';

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
    shortDescription: new FormControl('Comienzo de la ley de ajuste Cubano. Una historia detallada', [Validators.required, Validators.minLength(50)]),
    amountOfIdeas: new FormControl(3),
    blogName: new FormControl('Cubano Legal'),
    primaryKeyword: new FormControl('ley de ajuste cubano'),
    secondaryKeywords: new FormControl('emigracion, cubanos, leyes'),
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
