import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { ArticleService } from 'src/app/blogger/services/article.service';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WebpageService } from '../../services/webpage.service';

@Component({
  selector: 'app-list-webpages',
  templateUrl: './list-webpages.component.html',
  styleUrls: ['./list-webpages.component.scss']
})
export class ListWebpagesComponent implements OnDestroy, OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  webpagesToRender: WebpageDetailsDto[] = [];

  webpagesCount: number;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  dataSource = new MatTableDataSource<WebpageDetailsDto>(this.webpagesToRender);


  currentBlogProject: number;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];


  constructor(private _webpageService: WebpageService, private blogProjectService: BlogProjectsService) {

  }

  ngOnInit(): void {
    this._webpageService.webpageList$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(result => {
        this.webpagesToRender = result;
      });

    this.blogProjectService.selectedProjectId$.subscribe(blogProjectId => {
      if (blogProjectId !== -1) {
        this.currentBlogProject = blogProjectId;
        this._webpageService.listWebpages(blogProjectId, this.pageIndex, this.pageSize).subscribe();
        this._webpageService.webpagesCountByProject(blogProjectId).subscribe();
      }
    });

    this._webpageService.webpagesCount$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.webpagesCount = r;
    })
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  /**
 * Set the paginator after the view init since this component will
 * be able to query its view for the initialized paginator.
 */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(e: PageEvent) {
    this._webpageService.listWebpages(this.currentBlogProject, e.pageIndex, e.pageSize).subscribe();
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  publishArticle(article: IArticleDetailsDto) {
    // this.articles.navigateToGenerateFullArticle(article);
  }
}
