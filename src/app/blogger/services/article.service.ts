import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { ArticleGenerationParamsDto } from '../../content-creation/dto/generate-article.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IArticleFromAiResponseDto } from '../../content-creation/article/dtos/article-from-ai.dto';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleIdeasParamsDto } from '../../content-creation/dto/generate-articles-ideas-params.dto';
import { ArticleIdeasResponse } from '../../content-creation/article/dtos/article-ideas-from-ai.dto';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { IArticleDetailsDto } from '../dto/article-details.dto';
import { Router } from '@angular/router';
import { ISimpleGeneratorResultDto } from 'src/app/common/dto/simple-generator-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {



  baseUrl: string = environment.apiUrl + 'articles/';

  selectedProjectId: number;

  private _articleToEdit = new BehaviorSubject<IArticleDetailsDto | null>(null);
  articleToEdit$ = this._articleToEdit.asObservable();

  private _listOfArticlesSubject = new ReplaySubject<IArticleDetailsDto[]>();
  listOfArticles$ = this._listOfArticlesSubject.asObservable();

  private _articlesCountSubject = new ReplaySubject<number>();
  articlesCount$ = this._articlesCountSubject.asObservable();

  constructor(private http: HttpClient, private blogProjectService: BlogProjectsService, private router: Router) {
    this.blogProjectService.selectedProjectId$.subscribe(r => {
      this.selectedProjectId = r;
    })
  }

  //#region Generator methods

  /**
   * Generate an article using params form the user.
   *
   * @param {ArticleGenerationParamsDto} articleCreationParams
   * @return {*}  {Observable<IArticleFromAiResponseDto>}
   * @memberof ArticleService
   */
  generateArticleFromParams(articleCreationParams: ArticleGenerationParamsDto): Observable<IArticleDetailsDto> {
    return this.http.post<IArticleDetailsDto>(this.baseUrl + 'blogger/article-from-params', articleCreationParams).pipe(tap(article => {
      article.body = this.markdownToHtml(article.body)
    }));
  }

  generateArticleIdeas(params: ArticleIdeasParamsDto): Observable<ArticleIdeasResponse> {
    params.blogProjectId = this.selectedProjectId;
    return this.http.post<ArticleIdeasResponse>(this.baseUrl + 'blogger/article-ideas', params);
  }

  generateArticleExcerpt(articleId: number): Observable<ISimpleGeneratorResultDto> {
    return this.http.post<ISimpleGeneratorResultDto>(this.baseUrl + 'articles/generate-excerpt', { articleId: articleId });
  }

  generateArticleSeoMetaDescription(articleId: number): Observable<ISimpleGeneratorResultDto> {
    return this.http.post<ISimpleGeneratorResultDto>(this.baseUrl + 'articles/generate-seo-meta-description', { articleId: articleId });
  }

  //#endregion

  getArticleById(articleId: number): Observable<IArticleDetailsDto> {
    let params = new HttpParams().set("id", articleId);
    return this.http.get<IArticleDetailsDto>(this.baseUrl, { params: params }).pipe(tap(r => {
      this._articleToEdit.next(r);
    }));
  }

  listArticlesForTable(blogProjectId: number, currentPage: number = 1, pageSize: number = 10) {
    let params = new HttpParams()
      .set("blogProjectId", blogProjectId)
      .set('pageSize', pageSize)
      .set('pageIndex', currentPage);
    return this.http.get<IArticleDetailsDto[]>(this.baseUrl + 'list-articles-for-table', { params }).pipe(tap(r => {
      this._listOfArticlesSubject.next(r)
    }))
  }

  articlesCountByProject(blogProjectId: number): Observable<{ amountOfArticles: number }> {
    let params = new HttpParams()
      .set("blogProjectId", blogProjectId);
    return this.http.get<{ amountOfArticles: number }>(this.baseUrl + 'articles-count', { params })
      .pipe(tap(r => {
        this._articlesCountSubject.next(r.amountOfArticles)
      }))
  }

  navigateToGenerateFullArticle(articleToEdit: IArticleDetailsDto): void {
    this._articleToEdit.next(articleToEdit);
    this.router.navigate([`/blogger/articles/create-full/${articleToEdit.id}`])

  }

  private markdownToHtml(markdownContent: string): string {
    return marked.parse(markdownContent);
  }
}
