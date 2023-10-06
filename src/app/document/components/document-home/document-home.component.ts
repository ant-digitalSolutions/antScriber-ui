import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  windowHeight: string;

  constructor(
    private _docService: DocumentService,
    private _route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
    this.setListeners();
    this.setContainerHeight();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.setContainerHeight();
  }


  private setContainerHeight() {
    this.windowHeight = `${window.innerHeight}px`
  }

  setListeners() {
    this._route
      .queryParams
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(params => {
        if (params['docId']) {
          this._docService.showFavorites = false;
          this._docService.documentInEditionId = params['docId'];
        } else {
          this._docService.documentInEditionId = null;
        }

        if (params['folderId']) {
          this._docService.showFavorites = false;
          this._docService.selectedFolderId = params['folderId']
        } else {
          this._docService.selectedFolderId = undefined;
        }

        if (params['show']) {
          const paramValue = params['show'];

          if (paramValue === 'favorites') {
            this._docService.showFavorites = true;
          }
        }

        // else {
        //   this._docService.showFavorites = false;
        //   this._docService.documentInEditionId = null;
        // }
      });
  }


  public get documentId(): string | null {
    return this._docService.documentInEditionId;
  }


}
