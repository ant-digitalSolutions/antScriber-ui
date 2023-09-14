import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { environment } from 'src/environments/environment';
import { ArticleIdea, ArticleIdeasResponse } from '../dtos/article-ideas-from-ai.dto';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleIdeasService {


  baseUrl = environment.apiUrl;

  selectedProjectId: number;

  private _articleIdeas = new BehaviorSubject<ArticleIdea[]>([]);
  articleIdeas$ = this._articleIdeas.asObservable();

  private _articleIdeasPrimaryKeywords = new BehaviorSubject<string[]>([]);
  articleIdeasPrimaryKeywords$ = this._articleIdeasPrimaryKeywords.asObservable();

  private _ideaToGenerateArticle = new BehaviorSubject<ArticleIdea>(null as any);
  ideaToGenerateArticle$ = this._ideaToGenerateArticle.asObservable();

  constructor(private blogProjectService: BlogProjectsService, private http: HttpClient) {
    this.blogProjectService.selectedProjectId$.subscribe(r => {
      this.selectedProjectId = r;
    })
  }

  listArticleIdeasForCurrentProject(projectId: number) {
    let params = new HttpParams().set("blogProjectId", projectId)
    return this.http.get<ArticleIdeasResponse>(this.baseUrl + 'articles/list-ideas', { params: params }).pipe(tap(r => {
      const articleIdeas = new ArticleIdeasResponse(r);
      this._articleIdeas.next(articleIdeas.ideas);
      this.setPrimaryKeywordsList();
    }));
  }

  getArticleIdeasByPrimaryKeyword(primaryKeyword: string): ArticleIdea[] {
    return this._articleIdeas.value.filter(idea => (primaryKeyword === 'all' || idea.primaryKeyword == primaryKeyword));
  }

  filterArticleIdeasBySearch(searchTerm: string): ArticleIdea[] {
    console.log(searchTerm);
    return this._articleIdeas.value.filter(idea => idea.containsSearchTerm(searchTerm));
  }

  setArticleIdeaToGenerateArticle(articleIdea: ArticleIdea) {
    this._ideaToGenerateArticle.next(articleIdea);
  }

  private setPrimaryKeywordsList(): void {
    const primaryKeywords = ['all']
    // primaryKeywords.push(...this._articleIdeas.value.map(idea => idea.primaryKeyword));
    this._articleIdeasPrimaryKeywords.next([...new Set(primaryKeywords)]);
  }
}
