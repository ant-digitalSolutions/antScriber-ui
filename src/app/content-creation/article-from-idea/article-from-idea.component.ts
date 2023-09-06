import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContentCreationService } from '../content-creation.service';
import { ArticleGenerationParamsDto } from '../dto/generate-article.dto';
import { IArticleFromAiResponseDto } from '../dto/article-from-ai.dto';

@Component({
  selector: 'app-article-from-idea',
  templateUrl: './article-from-idea.component.html',
  styleUrls: ['./article-from-idea.component.scss']
})
export class ArticleFromIdeaComponent {

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
  constructor(private contentGenerator: ContentCreationService) {
    
    
  }

  generateArticle() {
    this.isLoading = true;
    console.log(this.articleCreationForm.value);
    
    const articleCreationParams = new ArticleGenerationParamsDto(this.articleCreationForm.value as any);

    this.contentGenerator.generateArticleFromIdea(articleCreationParams).subscribe(result => {
      this.isLoading = false;
      this.generatedArticleResponse = result;
      console.log(result);
    })
  }

}
