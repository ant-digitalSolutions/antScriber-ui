import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { ArticleGenerationParamsDto } from '../../content-creation/dto/generate-article.dto';
import { HttpClient } from '@angular/common/http';
import { IArticleFromAiResponseDto } from '../../content-creation/article/dtos/article-from-ai.dto';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleIdeasParamsDto } from '../../content-creation/dto/generate-articles-ideas-params.dto';
import { ArticleIdeasResponse } from '../../content-creation/article/dtos/article-ideas-from-ai.dto';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  baseUrl: string = environment.apiUrl;

  selectedProjectId: number;

  constructor(private http: HttpClient, private blogProjectService: BlogProjectsService) { 
    this.blogProjectService.selectedProjectId$.subscribe(r => {
      this.selectedProjectId = r;
    })
  }

  /**
   * Generate an article using params form the user.
   *
   * @param {ArticleGenerationParamsDto} articleCreationParams
   * @return {*}  {Observable<IArticleFromAiResponseDto>}
   * @memberof ArticleService
   */
  generateArticleFromParams(articleCreationParams: ArticleGenerationParamsDto): Observable<IArticleFromAiResponseDto> {
    return this.http.post<IArticleFromAiResponseDto>(this.baseUrl + 'blogger/article-from-params', articleCreationParams).pipe(tap(article => {
      article.body = this.markdownToHtml(article.body)
    }));
  }

  generateArticleIdeas(params: ArticleIdeasParamsDto): Observable<ArticleIdeasResponse> {
    params.blogProjectId = this.selectedProjectId;
    return this.http.post<ArticleIdeasResponse>(this.baseUrl + 'blogger/article-ideas', params);
  }

  private markdownToHtml(markdownContent: string): string {
    return marked.parse(markdownContent);
  }
}
