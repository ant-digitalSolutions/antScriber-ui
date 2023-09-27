import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DocumentService } from '../../services/document.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document-home',
  templateUrl: './document-home.component.html',
  styleUrls: ['./document-home.component.scss']
})
export class DocumentHomeComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private _route: ActivatedRoute,
    private _docService: DocumentService,
    private _router: Router) { }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
 

    this.setListeners();
  }

  setListeners() {
    this._docService.newDocument$.pipe(takeUntil(this.componentDestroyed$)).subscribe(d => {
      if (d != null) {
        this._docService.currentDocumentIdInEdition = d!.uuid;
        this._router.navigate([], {
          relativeTo: this._route,
          queryParams:
          {
            docId: this._docService.currentDocumentIdInEdition
          },
          replaceUrl: true,
        });
      }
    });

    this._route
          .queryParams
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(params => {
            if (params['docId']) {
              this._docService.currentDocumentIdInEdition = params['docId'];
              this._docService.currentDocumentIdInEdition = this._docService.currentDocumentIdInEdition;
            } else {
              this._docService.currentDocumentIdInEdition = null;
            }
          });
  }

  
  public get documentId() : string | null {
    return this._docService.currentDocumentIdInEdition;
  }
  

}
