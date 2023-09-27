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

  documentId: string | null;



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
        this.documentId = d!.uuid;
        const currentUrlState= this._router.url;
        // this._location.go(`${currentUrlState}/doc`, `docId=${this.documentId}`);
        this._router.navigate([], {
          relativeTo: this._route,
          queryParams:
          {
            docId: this.documentId
          },
          replaceUrl: true,
        });
      }
    });

    this._route.paramMap.pipe(takeUntil(this.componentDestroyed$)).subscribe(p => {
      if (p.has('docId')) {
        this.documentId = p.get('docId')!;
      } else {
        this.documentId = null;
      }
    });



    this._route
          .queryParams
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(params => {
            if (params['docId']) {
              this.documentId = params['docId'];
            } else {
              this.documentId = null;
            }
          });
  }

}
