import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebpageGenerateParams } from '../dtos/webpage-generator-params.dto';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { WebpageDetailsDto } from '../dtos/webpage-details.dto';
import { WebpageSectionDto } from '../dtos/webpage-section.dto';

@Injectable()
export class WebpageService {

  baseUrl = environment.apiUrl + 'websites'

  private _webpageSectionsSubject = new ReplaySubject<WebpageSectionDto>();
  webpageSection$ = this._webpageSectionsSubject.asObservable();

  private _webpageSubject = new ReplaySubject<WebpageDetailsDto>();
  webpage$ = this._webpageSubject.asObservable();

  constructor(private http: HttpClient) { }

  createWebpageOutline(webpageGeneratorParams: WebpageGenerateParams): Observable<IRequestResponse<WebpageDetailsDto>> {
    return this.http.post<IRequestResponse<WebpageDetailsDto>>(this.baseUrl + '/generate-outline', webpageGeneratorParams).pipe(tap(r => {
      if (r.success && r.data)
        this._webpageSubject.next(r.data);
    }))
  }
}
