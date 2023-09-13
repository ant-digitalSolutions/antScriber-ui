import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article-upload-feature-image',
  templateUrl: './article-upload-feature-image.component.html',
  styleUrls: ['./article-upload-feature-image.component.scss']
})
export class ArticleUploadFeatureImageComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<any>;

  @Input()
  articleId: number;

  @Input()
  featureImagePath?: string;

  isLoading = false;

  constructor(private articleService: ArticleService ) {}
  ngOnInit(): void {
    this.articleService.articleFeatureImage$.pipe(takeUntil(this.componentDestroyed$)).subscribe(articleFeatureImagePath => {
      this.featureImagePath = articleFeatureImagePath;
    })
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;

    } else {
      this.fileName = 'Select File';
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";
    // this.progress = Math.round(100 * event.loaded / event.total);

    if (this.currentFile) {
      this.articleService.uploadFeaturedImage(this.currentFile, this.articleId).subscribe();
    }
  }

  
  public get imagePath() : string {
   return environment.apiUrl + this.featureImagePath;
  }
  
}
