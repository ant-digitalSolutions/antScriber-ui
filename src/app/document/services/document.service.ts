import { DocumentUpdateDto } from './../dtos/document-update.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentCreateDto } from '../dtos/document-create.dto';
import { DocumentDetailsDto } from '../dtos/document-details.dto';
import { ToastrService } from 'ngx-toastr';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { IRequestResponse } from 'src/app/common/dto/request-response.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { WizardTableElements } from '../dtos/wizard-table-elements.dto';
import { WizardTableElement } from '../dtos/wizard-table-element.dto';
import { FolderDetailsDto } from '../dtos/folder-details.dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {





  baseUrl = environment.apiUrl + 'document';
  selectedProjectId: any;

  private _documentResponse = new BehaviorSubject<DocumentDetailsDto | null>(null);
  documentInEdition$ = this._documentResponse.asObservable();

  private _docsList = new BehaviorSubject<DocumentDetailsDto[]>([]);
  docsList$ = this._docsList.asObservable();

  private _wizardTableElements = new BehaviorSubject<WizardTableElement[]>([]);
  wizardTableElements$ = this._wizardTableElements.asObservable();

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

  private _currentFolderId?: string;

  private _currentFolderData?: FolderDetailsDto;

  /**
   * If true, the table will render the favorites elements.
   *
   * @private
   * @memberof DocumentService
   */
  private _showFavorites = false;

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
    });

    if (this._currentFolderId) {
      doc.folderUUId = this._currentFolderId;
    }

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

  setAsFavorite(docUUId: string, isFavorite: boolean): Observable<IRequestResponse<DocumentDetailsDto>> {
    const doc: DocumentUpdateDto = {
      isFavorite
    }
    return this.http.put<IRequestResponse<DocumentDetailsDto>>(`${this.baseUrl}/${docUUId}`, doc).pipe(tap(r => {
      if (r.success) {
        // this._documentResponse.next(r.data!);
      } else {
        this.toastr.error(r.error);
      }
    }))
  }



  /**
   * Retrieve the list of documents from the server that match
   * the given params.
   *
   * @param {number} blogProjectId
   * @param {number} [currentPage=1]
   * @param {number} [pageSize=10]
   * @return {*} 
   * @memberof DocumentService
   */
  listDocsForTable(blogProjectId: number, currentPage: number = 0, pageSize: number = 10) {
  
    let params = new HttpParams()
      .set("blogProjectId", blogProjectId)
      .set('pageSize', pageSize)
      .set('pageIndex', currentPage)
      .set('onlyFavorites', this._showFavorites);

      // if the user has a selected folder, 
      //the retrieve the documents that belongs to that folder.
    if (this._currentFolderId) {
     params = params.set('folderId', this._currentFolderId);
    }

    return this.http.get<IRequestResponse<WizardTableElements>>(this.baseUrl + '/list', { params }).pipe(tap(r => {
      if (r.success) {
        this._docsList.next(r.data!.documents)

        const wizardTableElements = this.convertToWizardElementList(r.data!);
        this._wizardTableElements.next(wizardTableElements);

        if (this._currentFolderId) {
          this._currentFolderData = r.data!.folderData;
        }
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
        // // navigate to the edition view after creating a new doc
        this.navigateToFolderView(r.data!.uuid);
      } else {
        this.toastr.error(r.error);
      }
    }))
  }

  handleNewContent(creatorDescription: string, newContent: string) {
    if (!this.documentInEditionId) {
      this.create(creatorDescription, newContent).subscribe();
    } else {
      this._documentInEditionData!.content += '<p>---</p>'
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

  private navigateToFolderView(folderId: string) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams:
      {
        folderId: folderId
      },
      replaceUrl: true,
    });
  }

  private convertToWizardElementList(tableData: WizardTableElements): WizardTableElement[] {
    const output: WizardTableElement[] = [];

    tableData.folders.forEach(e => {
      output.push({
        name: e.name,
        updatedAt: e.updatedAt,
        documentsCount: e.documentsCount,
        isDocument: false,
        uuid: e.uuid
      })
    });
    tableData.documents.forEach(e => {
      output.push({
        name: e.name,
        updatedAt: e.updatedAt,
        wordsCount: e.wordsCount,
        isDocument: true,
        uuid: e.uuid,
        isFavorite: e.isFavorite
      })
    });

    return output;
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
     {
      this._showFavorites = false;
       this.findByUuid(documentId).subscribe();
      }
     } 
    //else if (!documentId) {
    //   this._currentFolderData = undefined;
    //   this._currentFolderId = undefined;

    //   // this.listDocsForTable(this.selectedProjectId).subscribe();
    // }

  
  }



  public get documentInEdition(): DocumentDetailsDto | null {
    return this._documentInEditionData;
  }

  /**
   *
   *
   * @memberof DocumentService
   */
  public set selectedFolderId(folderId: string | undefined) {
    if (folderId === this._currentFolderId) {
      return;
    }
    this._currentFolderId = folderId;

    // if the documentId is not the one that we have in edition, then request it to the server.
    if (this.selectedProjectId)
     {
      this._showFavorites = false;
       this.listDocsForTable(this.selectedProjectId).subscribe();
      }
  }

  
  public get selectedFolderId() : string | undefined {
    return this._currentFolderId;
  }

  
  public get selectedFolderName() : string | undefined {
    return this._currentFolderData ? this._currentFolderData.name : undefined;
  }

  
  public set showFavorites(v : boolean) {
    this._showFavorites = v;

    if (v) {
      // this._currentFolderId = undefined;
      this.listDocsForTable(this.selectedProjectId).subscribe();
    }
  }

  
  public get showFavorites() : boolean {
    return this._showFavorites;
  }
  
  
  
  
}
