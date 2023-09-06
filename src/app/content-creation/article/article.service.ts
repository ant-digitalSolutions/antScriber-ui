import { Injectable } from '@angular/core';
import { marked } from 'marked';
import { ArticleGenerationParamsDto } from '../dto/generate-article.dto';
import { HttpClient } from '@angular/common/http';
import { IArticleFromAiResponseDto } from './dtos/article-from-ai.dto';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArticleService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

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

  private markdownToHtml(markdownContent: string): string {
    return marked.parse(markdownContent);
  }
}
