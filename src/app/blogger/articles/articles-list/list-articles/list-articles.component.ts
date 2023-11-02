import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { ArticleService } from 'src/app/blogger/services/article.service';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  articlesToRender: IArticleDetailsDto[] = [];

  articlesCount: number;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  dataSource = new MatTableDataSource<IArticleDetailsDto>(this.articlesToRender);


  currentBlogProject: number;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];


  constructor(private articles: ArticleService, private blogProjectService: BlogProjectsService) {

  }

  ngOnInit(): void {
    this.articles.listOfArticles$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(result => {
        this.articlesToRender = result;
      });

    this.blogProjectService.selectedProjectId$.subscribe(blogProjectId => {
      if (blogProjectId !== -1) {
        this.currentBlogProject = blogProjectId;
        this.articles.listArticlesForTable(blogProjectId, this.pageIndex, this.pageSize).subscribe();
        this.articles.articlesCountByProject(blogProjectId).subscribe();
      }
    });

    this.articles.articlesCount$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.articlesCount = r;
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
    this.articles.listArticlesForTable(this.currentBlogProject, e.pageIndex, e.pageSize).subscribe();
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  publishArticle(article: IArticleDetailsDto) {
    this.articles.navigateToGenerateFullArticle(article);
  }
}
