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
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {





  baseUrl = environment.apiUrl + 'document';
  selectedProjectId: any;

  private _documentResponse = new ReplaySubject<DocumentDetailsDto | null>();
  documentInEdition$ = this._documentResponse.asObservable();

  private _docsList = new ReplaySubject<DocumentDetailsDto[]>();
  docsList$ = this._docsList.asObservable();

  /**
   * UUId of the selected document. This document is in edition mode.
   *
   * @type {(string | null)}
   * @memberof DocumentService
   */
  private _currentDocumentId: string | null;

  /**
   * Contains the data of the current document that is in edition mode.
   *
   * @private
   * @type {(DocumentDetailsDto | null)}
   * @memberof DocumentService
   */
  private _documentInEditionData: DocumentDetailsDto | null;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private blogProjectService: BlogProjectsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
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
        this._documentResponse.next(r.data!);
        this._documentInEditionData = r.data!;

        // navigate to the edition view after creating a new doc
        this.navigateToDocumentEditionView(r.data!.uuid);

      } else {
        this.toastr.error(r.error);
      }
    }))
  }

  update(doc: DocumentUpdateDto): Observable<IRequestResponse<DocumentDetailsDto>> {
    return this.http.put<IRequestResponse<DocumentDetailsDto>>(`${this.baseUrl}/${this.documentInEditionId}`, doc).pipe(tap(r => {
      if (r.success) {
        // this._documentResponse.next(r.data!)
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
    return this.http.get<IRequestResponse<DocumentDetailsDto>>(`${this.baseUrl}`, { params })
      .pipe(tap(r => {
        if (r.success) {
          this._documentResponse.next(r.data!);
          this._documentInEditionData = r.data!;
        } else {
          this.toastr.error(r.error);
        }
      }))
  }

  /**
   * Creates a new folder on DB. THe folder is the container of 
   * documents
   *
   * @param {string} folderName
   * @return {*}  {Observable<any>}
   * @memberof DocumentService
   */
  createFolder(folderName: string): Observable<any> {
    const folder = {
      name: folderName,
    }

    return this.http.post<IRequestResponse<DocumentDetailsDto>>(this.baseUrl + '/create-folder', folder).pipe(tap(r => {
      if (r.success) {
        // this._documentResponse.next(r.data!);
        // this._documentInEditionData = r.data!;

        // // navigate to the edition view after creating a new doc
        // this.navigateToDocumentEditionView(r.data!.uuid);

        console.log(`new FOlder: ${r.data}`)

      } else {
        this.toastr.error(r.error);
      }
    }))
  }

  handleNewContent(creatorDescription: string, newContent: string) {
    if (!this.documentInEditionId) {
      this.create(creatorDescription, newContent).subscribe();
    } else {
      this._documentInEditionData!.content += newContent;
    }
  }

  cleanData() {
    this.documentInEditionId = null;
    this._documentInEditionData = null;
  }

  private navigateToDocumentEditionView(documentId: string) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams:
      {
        docId: documentId
      },
      replaceUrl: true,
    });
  }

  // Properties


  public get documentInEditionId(): string | null {
    return this._currentDocumentId;
  }


  /**
   *
   *
   * @memberof DocumentService
   */
  public set documentInEditionId(documentId: string | null) {
    this._currentDocumentId = documentId;

    // if the documentId is not the one that we have in edition, then request it to the server.
    if (documentId && (!this._documentInEditionData || (this._documentInEditionData && this._documentInEditionData.uuid !== documentId))) {
      this.findByUuid(documentId).subscribe();
    }
  }



  public get documentInEdition(): DocumentDetailsDto | null {
    return this._documentInEditionData;
  }
}
