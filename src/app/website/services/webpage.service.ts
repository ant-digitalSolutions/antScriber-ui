import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebpageGenerateParams } from '../dtos/webpage-generator-params.dto';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { WebpageSectionDto } from '../dtos/webpage-section.dto';

@Injectable()
export class WebpageService {

  baseUrl = environment.apiUrl + 'websites'

  private _webpageSectionsSubject = new ReplaySubject<WebpageSectionDto[]>();
  webpageSections$ = this._webpageSectionsSubject.asObservable();

  constructor(private http: HttpClient) { }

  createWebpageOutline(webpageGeneratorParams: WebpageGenerateParams): Observable<IRequestResponse<WebpageSectionDto[]>> {
    return this.http.post<IRequestResponse<WebpageSectionDto[]>>(this.baseUrl + '/generate-outline', webpageGeneratorParams).pipe(tap(r => {
      if (r.success && r.data)
        this._webpageSectionsSubject.next(r.data);
    }))
  }
}
