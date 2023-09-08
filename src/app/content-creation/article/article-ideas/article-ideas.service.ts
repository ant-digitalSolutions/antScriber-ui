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

  constructor(private blogProjectService: BlogProjectsService, private http: HttpClient) {
    this.blogProjectService.selectedProjectId$.subscribe(r => {
      this.selectedProjectId = r;
    })
  }

  listArticleIdeasForCurrentProject(projectId: number) {
    let params = new HttpParams().set("blogProjectId", projectId)
    return this.http.get<ArticleIdeasResponse>(this.baseUrl + 'blogger/article-ideas', {params: params}).pipe(tap(r => {
      const articleIdeas = new ArticleIdeasResponse(r);
      this._articleIdeas.next(articleIdeas.ideas);
    }));
  }
}
 