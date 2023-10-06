import { Component, HostListener, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { DocumentDetailsDto } from '../../dtos/document-details.dto';
import { Subject, take, takeUntil } from 'rxjs';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { P } from '@angular/cdk/keycodes';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit, OnDestroy {



  public Editor = BalloonEditor;


  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  @Input()
  documentId: string;

  docNameForm: FormControl;

  editorHeight: string;


  constructor(
    private _docService: DocumentService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setListerners();
    this.setEditorHeight();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete();

    this._docService.cleanData();
  }

  setListerners() {
    this._docService.documentInEdition$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(doc => {
        if (doc) {
          this.docNameForm = new FormControl(doc.name, [Validators.required(), Validators.maxLength(50)])
        }
      })
  }

  saveEditorChanges() {
    this._docService.update({ content: this.documentContent }).subscribe();
  }

  updateDocName() {
    if (this.docNameForm.valid)
      this._docService.update({ name: this.docNameForm.value }).subscribe();
    console.log('After blur')
  }


  goback() {
    this.saveEditorChanges();
    const queryParams = this._route.snapshot.queryParams;

    const newQueryParams = {
      ...queryParams
    };
    newQueryParams['docId'] = null;

    this.router.navigate([], {
      relativeTo: this._route,
      queryParams: newQueryParams,
      replaceUrl: true,
    });
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.setEditorHeight();
  }

  setEditorHeight() {
    this.editorHeight = `${window.innerHeight}px`;
  }

  
  public get documentContent() : string {
    if (this._docService.documentInEdition) {
      return this._docService.documentInEdition!.content;
    } else {
      return '';
    }
  }

  
  public set documentContent(v : string) {
    this._docService.documentInEdition!.content = v;
  }
  
  

}
