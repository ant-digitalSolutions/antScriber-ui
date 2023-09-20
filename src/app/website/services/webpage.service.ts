import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WebpageGenerateParams } from '../dtos/webpage-generator-params.dto';
import { Observable, ReplaySubject, Subject, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { WebpageDetailsDto } from '../dtos/webpage-details.dto';
import { WebpageSectionDto } from '../dtos/webpage-section.dto';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WebpageSectionContentGeneratorDto } from '../dtos/webpage-section-generator.dto';

@Injectable()
export class WebpageService {



  baseUrl = environment.apiUrl;

  private _webpageSectionsSubject = new ReplaySubject<WebpageSectionDto>();
  webpageSection$ = this._webpageSectionsSubject.asObservable();

  private _webpageSubject = new ReplaySubject<WebpageDetailsDto>();
  webpage$ = this._webpageSubject.asObservable();

  constructor(private http: HttpClient, private _projectService: BlogProjectsService) { }

  createWebpageOutline(webpageGeneratorParams: WebpageGenerateParams): Observable<IRequestResponse<WebpageDetailsDto>> {
      webpageGeneratorParams.blogProjectId = this._projectService.selectedProjectId;
    return this.http.post<IRequestResponse<WebpageDetailsDto>>(this.baseUrl + 'websites/generate-outline', webpageGeneratorParams).pipe(tap(r => {
      if (r.success && r.data)
        this._webpageSubject.next(r.data);
    }))
  }

  getWebpageAllData(webpageId: number) {
    let params = new HttpParams().set("webpageId", webpageId)
    return this.http.get<WebpageDetailsDto>(this.baseUrl + `websites/get-with-all-data`, { params: params }).pipe(tap(webpage => {
      this._webpageSubject.next(webpage);
    }))
  }
}
