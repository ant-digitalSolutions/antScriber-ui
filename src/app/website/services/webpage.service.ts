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
import { ToastrService } from 'ngx-toastr';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic'

@Injectable()
export class WebpageService {



  baseUrl = getBaseApiURL();

  private _webpageSectionsSubject = new ReplaySubject<WebpageSectionDto>();
  webpageSection$ = this._webpageSectionsSubject.asObservable();

  private _webpageSubject = new ReplaySubject<WebpageDetailsDto>();
  webpage$ = this._webpageSubject.asObservable();

  private _webpagesCountSubject = new ReplaySubject<number>();
  webpagesCount$ = this._webpagesCountSubject.asObservable();

  private _webpageListSubject = new ReplaySubject<WebpageDetailsDto[]>();
  /**
   * Contains the list of webpages to render in the List View
   *
   * @memberof WebpageService
   */
  webpageList$ = this._webpageListSubject.asObservable();

  constructor(private http: HttpClient, private _projectService: BlogProjectsService, private toastr: ToastrService) { }

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

  /**
   *List the webpages with basic data for the given project.
   * Intended for pagination.
   *
   *
   * @param {number} projectId
   * @param {number} pageSize
   * @param {number} currentPage
   * @return {*}  {Observable<IRequestResponse<WebpageDetailsDto[]>>}
   * @memberof WebpageService
   */
  listWebpages(projectId: number, pageSize: number, currentPage: number): Observable<IRequestResponse<WebpageDetailsDto[]>> {
    let params = new HttpParams()
      .set("projectId", projectId)
      .set('pageSize', pageSize)
      .set('pageIndex', currentPage);

      return this.http.get<IRequestResponse<WebpageDetailsDto[]>>(this.baseUrl + 'websites/webpages/list', {params}).pipe(tap(r => {
        if (r.success)
          this._webpageListSubject.next(r.data!)
        else {
          this.toastr.error(r.error);
        }
      }))
  }

  /**
   * Get the amount of webpages that belongs to the 
   * given project.
   *
   * @param {number} projectId
   * @return {*}  {Observable<IRequestResponse<number>>}
   * @memberof WebpageService
   */
  webpagesCountByProject(projectId: number): Observable<IRequestResponse<number>> {
    let params = new HttpParams()
      .set("projectId", projectId);
    return this.http.get<IRequestResponse<number>>(this.baseUrl + 'websites/webpages/count', { params })
      .pipe(tap(r => {
        if (r.success)
          this._webpagesCountSubject.next(r.data!)
        else 
          this.toastr.error(r.error);
      }))
  }
}
