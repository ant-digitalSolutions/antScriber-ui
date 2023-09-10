import { ArticleService } from './../services/article.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArticleDetailsDto } from '../dto/article-details.dto';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ActivatedRoute } from '@angular/router';

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

  article: IArticleDetailsDto = {
    id: -1,
    title: 'THis is the title of the article',
    body: `On this page we will provide Angular slice pipe example. The SlicePipe is Angular CommonModule API. Slice pipe slices a given array or string into subsets. We need to provide start and end index. The SlicePipe uses slice keyword with pipe operator. The SlicePipe uses JavaScript API Array.prototype.slice() and String.prototype.slice() to perform its task. On this page we will provide slice pipe example using array and string expression separately. We will discuss start and end index taking positive and negative values both. Now find the complete example step-by-step.`,
    primaryKeyword: 'web design',
    secondaryKeywords: 'web development, business, marketing',
    categories: ['web', 'design', 'implementation'],
    tags: ['tag1', 'tag2', 'tag3']
  };

  constructor(private articlesService: ArticleService, private route: ActivatedRoute) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    const availableData = Boolean(this.route.snapshot.paramMap.get('withData'));

      this.articlesService.getArticleById(this.articleId).subscribe(article => {
        console.log(article)
      });

    this.setForm();
    this.initializeFieldState();

    this.articlesService.articleToEdit$.pipe(takeUntil(this.componentDestroyed$)).subscribe(article => {
      if (article) {
        this.article = article!;
        this.setForm();
      }
    })
  }


  public get secondaryKeywords(): string[] {
    return this.article.secondaryKeywords ? this.article.secondaryKeywords.split(',') : [];
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
      this.article.excerpt = r;
    })
  }
  //#endregion

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
}
