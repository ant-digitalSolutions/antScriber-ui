import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { BlogProjectsService } from '../../services/blog-projects.service';
import { IArticleDetailsDto } from '../../dto/article-details.dto';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-articles-in-table',
  templateUrl: './list-articles-in-table.component.html',
  styleUrls: ['./list-articles-in-table.component.scss']
})
export class ListArticlesInTableComponent implements OnInit, OnDestroy, AfterViewInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  articlesToRender: IArticleDetailsDto[] = [];

  articlesCount: number;

  displayedColumns = ['title', 'primary-keyword', 'status', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<IArticleDetailsDto>(this.articlesToRender);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

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
