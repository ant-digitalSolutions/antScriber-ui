import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContentCreationService } from '../../content-creation.service';
import { IArticleFromAiResponseDto } from '../dtos/article-from-ai.dto';
import { ArticleGenerationParamsDto } from '../../dto/generate-article.dto';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-generate-article-from-user-params',
  templateUrl: './generate-article-from-user-params.component.html',
  styleUrls: ['./generate-article-from-user-params.component.scss']
})
export class GenerateArticleFromUserParamsComponent {
  isLoading = false;

  generatedArticleResponse: IArticleFromAiResponseDto;

  articleCreationForm = new FormGroup({
    articleIdea: new FormControl('Comienzo de la ley de ajuste Cubano. Una historia detallada', [Validators.required, Validators.minLength(50)]),
    amountOfWords: new FormControl(800),
    blogName: new FormControl('Cubano Legal'),
    addCTA: new FormControl(false),
  })
  /**
   *
   */
  constructor(private articleService: ArticleService) {


  }

  generateArticle() {
    this.isLoading = true;
    console.log(this.articleCreationForm.value);

    const articleCreationParams = new ArticleGenerationParamsDto(this.articleCreationForm.value as any);

    this.articleService.generateArticleFromParams(articleCreationParams).subscribe(result => {
      this.isLoading = false;
      this.generatedArticleResponse = result;
      console.log(result);
    })
  }
}
