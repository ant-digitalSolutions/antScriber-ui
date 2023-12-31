import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { marked } from 'marked';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { ISimpleGeneratorResultDto } from 'src/app/common/dto/simple-generator-response.dto';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { ArticleIdeasResponse } from '../../content-creation/article/dtos/article-ideas-from-ai.dto';
import { ArticleGenerationParamsDto } from '../../content-creation/dto/generate-article.dto';
import { ArticleIdeasParamsDto } from '../../content-creation/dto/generate-articles-ideas-params.dto';
import { IArticleDetailsDto } from '../dto/article-details.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {



  baseUrl: string = getBaseApiURL() + 'articles/';

  selectedProjectId: number;

  private _articleToEdit = new BehaviorSubject<IArticleDetailsDto | null>(null);
  articleToEdit$ = this._articleToEdit.asObservable();

  private _listOfArticlesSubject = new ReplaySubject<IArticleDetailsDto[]>();
  listOfArticles$ = this._listOfArticlesSubject.asObservable();

  private _articlesCountSubject = new ReplaySubject<number>();
  articlesCount$ = this._articlesCountSubject.asObservable();

  private _articleFeatureImageSubject = new ReplaySubject<string>();
  articleFeatureImage$ = this._articleFeatureImageSubject.asObservable();

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
    return this.http.post<IArticleDetailsDto>(this.baseUrl + 'generate-body', articleCreationParams).pipe(tap(article => {
      article.body = this.markdownToHtml(article.body)
    }));
  }

  generateArticleIdeas(params: ArticleIdeasParamsDto): Observable<ArticleIdeasResponse> {
    params.blogProjectId = this.selectedProjectId;
    return this.http.post<ArticleIdeasResponse>(this.baseUrl + 'generate-ideas', params);
  }

  generateArticleExcerpt(articleId: number): Observable<ISimpleGeneratorResultDto> {
    return this.http.post<ISimpleGeneratorResultDto>(this.baseUrl + 'generate-excerpt', { articleId: articleId });
  }

  generateArticleSeoMetaDescription(articleId: number): Observable<ISimpleGeneratorResultDto> {
    return this.http.post<ISimpleGeneratorResultDto>(this.baseUrl + 'generate-seo-meta-description', { articleId: articleId });
  }

  generateArticleFaqScript(articleId: number): Observable<ISimpleGeneratorResultDto> {
    return this.http.post<ISimpleGeneratorResultDto>(this.baseUrl + `generate-faq-script`, { articleId: articleId });
  }

  //#endregion

  getArticleById(articleId: number): Observable<IArticleDetailsDto> {
    let params = new HttpParams().set("id", articleId);
    return this.http.get<IArticleDetailsDto>(this.baseUrl, { params: params }).pipe(tap(r => {
      r.body = this.markdownToHtml(r.body);
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

  updateArticle(article: IArticleDetailsDto) {
    return this.http.put(this.baseUrl + article.id, article);
  }

  navigateToGenerateFullArticle(articleToEdit: IArticleDetailsDto): void {
    this._articleToEdit.next(articleToEdit);
    this.router.navigate([`/blogger/articles/create-full/${articleToEdit.id}`])
  }

  uploadFeaturedImage(file: File, articleId: number): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('articleId', articleId.toString())

    return this.http.post<{ filePath: string }>(this.baseUrl + 'upload-article-featured-image', formData).pipe(tap(r => {
      this._articleFeatureImageSubject.next(r.filePath);
    }));
  }

  private markdownToHtml(markdownContent: string): string {
    return marked.parse(markdownContent);
  }
}
