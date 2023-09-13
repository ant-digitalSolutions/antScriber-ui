import { ArticleService } from './../services/article.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IArticleDetailsDto } from '../dto/article-details.dto';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/compiler';

@Component({
  selector: 'app-generate-full-article-for-blog',
  templateUrl: './generate-full-article-for-blog.component.html',
  styleUrls: ['./generate-full-article-for-blog.component.scss']
})
export class GenerateFullArticleForBlogComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  /**
   * Contains the ID of the article that the user is editing.
   *
   * @type {number}
   * @memberof GenerateFullArticleForBlogComponent
   */
  articleId: number;

  /**
   * Indicate if a field is being edited.
   * 
   * if this.fieldEditionStatus['fieldName'] === true, then the field
   * 'title' is in edition mode. Otherwise, is not being edited.
   *
   * @type {{[fieldName: string]: boolean;}}
   * @memberof GenerateFullArticleForBlogComponent
   */
  fieldEditionStatus: { [fieldName: string]: boolean; } = {};

  /**
   * Indicates if the fields is being loading.
   *
   * @type {{ [fieldName: string]: boolean; }}
   * @memberof GenerateFullArticleForBlogComponent
   */
  fieldIsLoading: { [fieldName: string]: boolean; } = {};

  articleForm: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    body: new FormControl(),
    primaryKeyword: new FormControl(),
    secondaryKeywords: new FormControl(),
    categories: new FormControl(),
    tags: new FormControl(),
  });


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;



  isLoading = false;

  article: IArticleDetailsDto;

  constructor(private articlesService: ArticleService, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    const availableData = Boolean(this.route.snapshot.paramMap.get('withData'));

    this.articlesService.getArticleById(this.articleId).subscribe(article => {
      this.article = article;
    });

    this.setForm();
    this.initializeFieldState();
  }

  setForm(): void {
    if (this.article) {
      this.articleForm = new FormGroup({
        id: new FormControl(this.article.id),
        title: new FormControl(this.article.title, [Validators.required()]),
        body: new FormControl(this.article.body, [Validators.required()]),
        primaryKeyword: new FormControl(this.article.primaryKeyword),
        secondaryKeywords: new FormControl(this.article.secondaryKeywords),
        categories: new FormControl(this.article.categories),
        tags: new FormControl(this.article.tags),
      })
    } else {
      this.articleForm = new FormGroup({
        id: new FormControl(),
        title: new FormControl(),
        body: new FormControl(),
        primaryKeyword: new FormControl(),
        secondaryKeywords: new FormControl(),
        categories: new FormControl(),
        tags: new FormControl(),
      })
    }
  }

  //#region Generator methods
  generateArticleExcerpt(): void {
    this.articlesService.generateArticleExcerpt(this.articleId).subscribe(r => {
      this.article.excerpt = r.resultText;

    })
  }

  generateArticleSEoMetaDescription(): void {
    this.articlesService.generateArticleSeoMetaDescription(this.articleId).subscribe(r => {
      this.article.seoMetaDescription = r.resultText;
    })
  }

  generateArticleFaqScript(): void {
    this.articlesService.generateArticleFaqScript(this.articleId).subscribe(r => {
      this.article.faqScript = r.resultText
    })
  }
  //#endregion

  updateArticleSeoMetaDescription(value: string) {
    this.article.seoMetaDescription = value;
  }

  updateArticleExcerpt(value: string) {
    this.article.seoMetaDescription = value;
  }

  /**
   * Initialize the status of the fields that are shown
   * in the view.
   *
   * @memberof GenerateFullArticleForBlogComponent
   */
  initializeFieldState(): void {
    const fieldKeys = Object.keys(IArticleDetailsDto);
    fieldKeys.forEach(field => {
      this.fieldEditionStatus[field] = false;
      this.fieldIsLoading[field] = false;
    });
  }

  getFieldEditionStatus(fieldName: string): boolean {
    return this.fieldEditionStatus[fieldName];
  }

  toggleFieldEditionStatus(fieldName: string): void {
    this.fieldEditionStatus[fieldName] = !this.fieldEditionStatus[fieldName];
  }

  addCategory(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (event.value.length > 3)
      this.article.categories!.push(value);
    event.chipInput!.clear();
  }

  editCategory(cat: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove secondary keyword if it no longer has a name
    if (!value) {
      this.removeCategory(cat);
      return;
    }

    const index = this.article.categories!.indexOf(cat);
    if (index >= 0) {
      this.article.categories![index] = value;
    }
  }

  removeCategory(cat: string) {
    const indexOfKey = this.article.categories!.indexOf(cat);
    if (indexOfKey >= 0)
      this.article.categories!.splice(indexOfKey, 1);
  }

  addTag(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (event.value.length > 3)
      this.article.categories!.push(value);
    event.chipInput!.clear();
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove secondary keyword if it no longer has a name
    if (!value) {
      this.removeTag(tag);
      return;
    }

    const index = this.article.categories!.indexOf(tag);
    if (index >= 0) {
      this.article.categories![index] = value;
    }
  }

  removeTag(tag: string) {
    const indexOfKey = this.article.categories!.indexOf(tag);
    if (indexOfKey >= 0)
      this.article.categories!.splice(indexOfKey, 1);
  }

  //#region properties
public get secondaryKeywords(): string[] {
  console.log(this.article.secondaryKeywords)
  return this.article.secondaryKeywords ? this.article.secondaryKeywords!.map(k => k.name) : [];
}
  //#endregion
}
