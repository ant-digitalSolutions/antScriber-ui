import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogProjectsService } from './blog-projects.service';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { KeywordDetailsDto } from '../dto/keywords/keyword-details.dto';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  baseUrl = environment.apiUrl + 'keywords/';
  selectedProjectId: number;

  private _keywordSearchResult = new ReplaySubject<KeywordDetailsDto[]>();
  keywordSearchResult$ = this._keywordSearchResult.asObservable();

  constructor(private blogProjectService: BlogProjectsService, private http: HttpClient) {
    this.blogProjectService.selectedProjectId$.subscribe(p => {
      this.selectedProjectId = p
    })
  }


  listKeywordsByTerm(term: string): Observable<KeywordDetailsDto[]> {
    let params = new HttpParams().set("keywordTerm", term).set('blogProjectId', this.selectedProjectId);

    return this.http.get<KeywordDetailsDto[]>(this.baseUrl + 'list-by-term', { params: params })
      .pipe(tap(r => this._keywordSearchResult.next(r)));
  }
}
