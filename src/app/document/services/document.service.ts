import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentCreateDto } from '../dtos/document-create.dto';
import { DocumentDetailsDto } from '../dtos/document-details.dto';
import { ToastrService } from 'ngx-toastr';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { DocumentUpdateDto } from '../dtos/document-update.dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {



  baseUrl = environment.apiUrl + 'document';
  selectedProjectId: any;

  private _newDocument = new BehaviorSubject<DocumentDetailsDto | null>(null);
  newDocument$ = this._newDocument.asObservable();

  private _documentResponse = new BehaviorSubject<DocumentDetailsDto | null>(null);
  docResponse$ = this._documentResponse.asObservable();

  private _docsList = new ReplaySubject<DocumentDetailsDto[]>();
  docsList$ = this._docsList.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService, private blogProjectService: BlogProjectsService,) {
    this.blogProjectService.selectedProjectId$.subscribe(r => {
      this.selectedProjectId = r;
    })
  }

  create(docName: string, docContent: string): Observable<any> {
    const doc = new DocumentCreateDto({
      name: docName,
      content: docContent,
      blogProjectId: this.selectedProjectId,
    })

    return this.http.post<IRequestResponse<DocumentDetailsDto>>(this.baseUrl, doc).pipe(tap(r => {
      if (r.success) {
        this._newDocument.next(r.data!)
      } else {
        this.toastr.error(r.error);
      }
    }))
  }

  update(documentId: string, doc: DocumentUpdateDto): Observable<IRequestResponse<DocumentDetailsDto>> {
    return this.http.put<IRequestResponse<DocumentDetailsDto>>(`${this.baseUrl}/${documentId}`, doc).pipe(tap(r => {
      if (r.success) {
        // this._documentResponse.next(r.data!)
        console.log('Doc update affected rows: ' + r.data)
      } else {
        this.toastr.error(r.error);
      }
    }))
  }

 

  listDocsForTable(blogProjectId: number, currentPage: number = 1, pageSize: number = 10) {
    let params = new HttpParams()
      .set("blogProjectId", blogProjectId)
      .set('pageSize', pageSize)
      .set('pageIndex', currentPage);
    return this.http.get<IRequestResponse<DocumentDetailsDto[]>>(this.baseUrl + '/list', { params }).pipe(tap(r => {
      if (r.success) {
        this._docsList.next(r.data!)
      } else {
        this.toastr.error(r.error);
      }
    }))
  }

  findByUuid(docId: string): Observable<IRequestResponse<DocumentDetailsDto>> {
    let params = new HttpParams()
      .set("uuid", docId)
    return this.http.get<IRequestResponse<DocumentDetailsDto>>(`${this.baseUrl}`, {params})
      .pipe(tap(r => {
        if (r.success) {
          this._documentResponse.next(r.data!)
        } else {
          this.toastr.error(r.error);
        }
      }))
  }

}
