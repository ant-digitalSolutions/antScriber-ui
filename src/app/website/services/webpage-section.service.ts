import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Observable, tap } from 'rxjs';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { environment } from 'src/environments/environment';
import { WebpageSectionDto } from '../dtos/webpage-section.dto';
import { ToastrService } from 'ngx-toastr';
import { P } from '@angular/cdk/keycodes';

@Injectable()
export class WebpageSectionService {

  baseUrl = environment.apiUrl + 'webpage-sections'

  private _updatedWebpageSection = new Subject<WebpageSectionDto>();
  updatedWebpageSection$ = this._updatedWebpageSection.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  updateWebpageSection(webpageSectionToUpdate: WebpageSectionDto): Observable<IRequestResponse<WebpageSectionDto>> {
    const params = new HttpParams().set('sectionId', webpageSectionToUpdate.id);
    return this.http.put<IRequestResponse<WebpageSectionDto>>(this.baseUrl + `/${webpageSectionToUpdate.id}`, webpageSectionToUpdate).pipe(tap(r => {
      if (r.success && r.data) {
        this._updatedWebpageSection.next(r.data);
        this.toastr.success(r.message)
      } else {
        this.toastr.error(r.error);
      }
    }))
  }
}
