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
    private _docService: DocumentService,
    private _route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
    this.setListeners();
  }

  setListeners() {
    this._route
      .queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(params => {
        if (params['docId']) {
          this._docService.documentInEditionId = params['docId'];
        } else {
          this._docService.documentInEditionId = null;
        }
      });
  }


  public get documentId(): string | null {
    return this._docService.documentInEditionId;
  }


}
