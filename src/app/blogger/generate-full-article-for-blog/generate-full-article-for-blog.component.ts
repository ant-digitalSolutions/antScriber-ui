import { Component, OnDestroy, OnInit } from '@angular/core';
import { IArticleDetailsDto } from '../dto/article-details.dto';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-generate-full-article-for-blog',
  templateUrl: './generate-full-article-for-blog.component.html',
  styleUrls: ['./generate-full-article-for-blog.component.scss']
})
export class GenerateFullArticleForBlogComponent implements OnInit, OnDestroy{


  componentDestroyed$: Subject<boolean> = new Subject();


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

  constructor(){

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
  }

  
  public get secondaryKeywords() : string[] {
    return this.article.secondaryKeywords ? this.article.secondaryKeywords.split(',') : [];
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
