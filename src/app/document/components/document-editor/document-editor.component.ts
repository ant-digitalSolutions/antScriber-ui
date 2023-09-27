import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { DocumentDetailsDto } from '../../dtos/document-details.dto';
import { Subject, take, takeUntil } from 'rxjs';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocumentEditorComponent implements OnInit, OnDestroy {



  public Editor = ClassicEditor;


  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  @Input()
  documentId: string;

  document: DocumentDetailsDto | null;

  documentContent = '';

  docNameForm: FormControl;


  constructor(
    private _docService: DocumentService,
    private _wizardService: WizardCreatorService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._docService.findByUuid(this.documentId).subscribe();
    this.setListerners()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListerners() {
    this._docService.docResponse$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(doc => {
        if (doc) {
          this.document = doc;
          this.documentContent = this.document!.content;
          this.docNameForm = new FormControl(this.document.name, [Validators.required(), Validators.maxLength(50)])
        }
      })

      // TODO: Change this logic. The wizardService is the one who should push new content to the 
      // documentService. Then we should listen to the docuemntService for new content
    this._wizardService.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(r => {
        this.documentContent += r;
      })
  }

  saveEditorChanges() {
    this._docService.update(this.documentId, { content: this.documentContent }).subscribe();
  }

  updateDocName() {
    if (this.docNameForm.valid)
      this._docService.update(this.documentId, { name: this.docNameForm.value }).subscribe();
    console.log('After blur')
  }

  goback() {
    this.saveEditorChanges();
    // this._location.back();
    this.router.navigate([], {
      relativeTo: this._route,
      queryParams:
      {
        docId: null
      },
      replaceUrl: true,
    });
    // this.router.navigate(['/wizard/creator'])
  }

}
