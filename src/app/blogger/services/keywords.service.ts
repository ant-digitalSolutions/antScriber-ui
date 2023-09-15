import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogProjectsService } from './blog-projects.service';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { KeywordDetailsDto } from '../dto/keywords/keyword-details.dto';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class KeywordsService {

  baseUrl = environment.apiUrl + 'keywords/';
  selectedProjectId: number;

  private _keywordSearchResult = new ReplaySubject<KeywordDetailsDto[]>();
  keywordSearchResult$ = this._keywordSearchResult.asObservable();

  private _primaryKeywordForArticleEdition = new Subject<KeywordDetailsDto>();
  primaryKeywordSelection$ = this._primaryKeywordForArticleEdition.asObservable();

  private _secondaryKeywordsForArticleEdition: KeywordDetailsDto[] = [];
  private _secondaryKeywordForArticleEditionSubject = new Subject<KeywordDetailsDto[]>();
  secondaryKeywordSelection$ = this._secondaryKeywordForArticleEditionSubject.asObservable();

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

  setPrimaryKeywordForArticleEdition(keyword: KeywordDetailsDto) {
    if (!keyword.blogProjectId) {
      keyword.blogProjectId = this.selectedProjectId
    }
    this._primaryKeywordForArticleEdition.next(keyword);
  }
  
  addSecondaryKeywordForArticleEdition(keyword: KeywordDetailsDto) {
    if (!keyword.blogProjectId) {
      keyword.blogProjectId = this.selectedProjectId
    }
    this._secondaryKeywordsForArticleEdition.push(keyword);
    this._secondaryKeywordForArticleEditionSubject.next(this._secondaryKeywordsForArticleEdition);
  }

  removeSecondaryKeywordForArticleEdition(keyword: KeywordDetailsDto) {
    if (keyword.id !== -1) {
      const index = this._secondaryKeywordsForArticleEdition.findIndex(s => s.id === keyword.id);
      if (index >= 0) {
        this._secondaryKeywordsForArticleEdition.splice(index, 1);
        this._secondaryKeywordForArticleEditionSubject.next(this._secondaryKeywordsForArticleEdition);
        return;
      }
    }

    const indexByName = this._secondaryKeywordsForArticleEdition.findIndex(s => s.name == keyword.name);
    if (indexByName >= 0) {
      this._secondaryKeywordsForArticleEdition.splice(indexByName, 1);
    }
    this._secondaryKeywordForArticleEditionSubject.next(this._secondaryKeywordsForArticleEdition);

  }

  editSecondaryKeywordForArticleEdition(keywordPreviousValue: string, keyword: KeywordDetailsDto) {
    const index = this._secondaryKeywordsForArticleEdition.findIndex(s => s.name == keywordPreviousValue);
    if (index >= 0) {
      this._secondaryKeywordsForArticleEdition.splice(index, 1);
    }

    this._secondaryKeywordsForArticleEdition.push(keyword);
    this._secondaryKeywordForArticleEditionSubject.next(this._secondaryKeywordsForArticleEdition);
  }

  cleanData() {
    this._secondaryKeywordsForArticleEdition = [];
  }
}
