import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContentCreationService } from '../../content-creation.service';
import { IArticleFromAiResponseDto } from '../dtos/article-from-ai.dto';
import { ArticleGenerationParamsDto } from '../../dto/generate-article.dto';
import { ArticleService } from '../article.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ArticleIdea } from '../dtos/article-ideas-from-ai.dto';
import { ArticleIdeasService } from '../article-ideas/article-ideas.service';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { BlogProjectDetailsDto } from 'src/app/blogger/dto/blog-project-details.dto';

@Component({
  selector: 'app-generate-article-from-user-params',
  templateUrl: './generate-article-from-user-params.component.html',
  styleUrls: ['./generate-article-from-user-params.component.scss']
})
export class GenerateArticleFromUserParamsComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  articleIdeaToGenerate: ArticleIdea;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isLoading = false;

  generatedArticleResponse: IArticleFromAiResponseDto;

  primaryKeywords: string[] = [];

  secondaryKeywords: string[] = [];

  articleCreationForm: FormGroup;

  currentBlogProject?: BlogProjectDetailsDto;
  /**
   *
   */
  constructor(private articleService: ArticleService, private articleIdeaService: ArticleIdeasService, private blogProjectService: BlogProjectsService) {


  }

  ngOnInit(): void {
    this.setForm();
    this.articleIdeaService.ideaToGenerateArticle$.pipe(takeUntil(this.componentDestroyed$)).subscribe(idea => {
      if (idea) {
        this.articleIdeaToGenerate = idea;
        this.secondaryKeywords = idea.secondaryKeywordsList;
        this.primaryKeywords = [idea.primaryKeyword];
        this.setForm();
      }
    });
    this.blogProjectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(projectId => {
      if (projectId && projectId !== -1) {
        this.currentBlogProject = this.blogProjectService.getBlogProjectById(projectId);
        this.articleCreationForm.addControl('blogName', new FormControl(this.currentBlogProject!.title, [Validators.required]))
        this.articleCreationForm.addControl('blogProjectId', new FormControl(this.currentBlogProject!.id, [Validators.required]))

      }
    })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setForm(): void {
    if (this.articleIdeaToGenerate) {
      this.articleCreationForm = new FormGroup({
        title: new FormControl(this.articleIdeaToGenerate.title),
        articleIdea: new FormControl(this.articleIdeaToGenerate.summary, [Validators.required, Validators.minLength(50)]),
        primaryKeyword: new FormControl(this.articleIdeaToGenerate.primaryKeyword),
        secondaryKeywords: new FormControl(this.articleIdeaToGenerate.secondaryKeywordsList),
        amountOfWords: new FormControl(800),
        addCTA: new FormControl(false),
      })
    } else {
      this.articleCreationForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        articleIdea: new FormControl('Comienzo de la ley de ajuste Cubano. Una historia detallada', [Validators.required, Validators.minLength(50)]),
        primaryKeyword: new FormControl('', [Validators.required]),
        secondaryKeywords: new FormControl(''),
        amountOfWords: new FormControl(800),
        addCTA: new FormControl(false),
      });
    }
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

  addNewPrimaryKeyword() {
    this.primaryKeywords.push(this.articleCreationForm.get('primaryKeyword')?.value)
  }

  addSecondaryKeyword(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (event.value.length > 3)
      this.secondaryKeywords.push(value);
    event.chipInput!.clear();
  }

  editSecondaryKeyword(sKey: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove secondary keyword if it no longer has a name
    if (!value) {
      this.removeSecondaryKey(sKey);
      return;
    }

    const index = this.secondaryKeywords.indexOf(sKey);
    if (index >= 0) {
      this.secondaryKeywords[index] = value;
    }
  }

  removeSecondaryKey(sKey: string) {
    const indexOfKey = this.secondaryKeywords.indexOf(sKey);
    if (indexOfKey >= 0)
      this.secondaryKeywords.splice(indexOfKey, 1);
  }
}
