import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleGenerationParamsDto } from '../../dto/generate-article.dto';
import { ArticleService } from '../../../blogger/services/article.service';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ArticleIdea } from '../dtos/article-ideas-from-ai.dto';
import { ArticleIdeasService } from '../article-ideas/article-ideas.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil, Observable } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { BlogProjectDetailsDto } from 'src/app/blogger/dto/blog-project-details.dto';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { KeywordsService } from 'src/app/blogger/services/keywords.service';

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

  generatedArticleResponse: IArticleDetailsDto;

  primaryKeywords: string[] = [];

  secondaryKeywords: string[] = [];

  articleCreationForm: FormGroup;

  currentBlogProject?: BlogProjectDetailsDto;
  /**
   *
   */
  constructor(private articleService: ArticleService, private articleIdeaService: ArticleIdeasService, private blogProjectService: BlogProjectsService,
    private keywordService: KeywordsService) {


  }

  ngOnInit(): void {
    this.setForm();
    this.setListeners();
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
        // primaryKeyword: new FormControl(this.articleIdeaToGenerate.primaryKeyword),
        amountOfWords: new FormControl(800),
        addCTA: new FormControl(false),
      })
    } else {
      this.articleCreationForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        articleIdea: new FormControl('', [Validators.required, Validators.minLength(50)]),
        // primaryKeyword: new FormControl('', [Validators.required]),
        amountOfWords: new FormControl(800),
        addCTA: new FormControl(false),
      });
    }
  }

  setListeners() {
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
    this.keywordService.primaryKeywordSelection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(k => {
      this.articleCreationForm.get('primaryKeyword')?.setValue(k);
    })
    this.keywordService.secondaryKeywordSelection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(sKeywords => {
      this.articleCreationForm.get('secondaryKeywords')?.setValue(sKeywords);
    })
  }

  generateArticleBody() {
    this.isLoading = true;
    console.log(this.articleCreationForm.value);

    const articleCreationParams = new ArticleGenerationParamsDto(this.articleCreationForm.value as any);

    this.articleService.generateArticleFromParams(articleCreationParams).subscribe(result => {
      this.isLoading = false;
      this.generatedArticleResponse = result;
    })
  }

  generateArticleMetadata() {
    this.articleService.navigateToGenerateFullArticle(this.generatedArticleResponse);
  }
}
