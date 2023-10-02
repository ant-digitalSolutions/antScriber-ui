import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { DocumentService } from 'src/app/document/services/document.service';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';

@Component({
  selector: 'app-wizard-creator-editor',
  templateUrl: './wizard-creator-editor.component.html',
  styleUrls: ['./wizard-creator-editor.component.scss']
})
export class WizardCreatorEditorComponent implements OnDestroy, OnInit {


  public Editor = InlineEditor;


  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  docContent = '';


  constructor(
    private _wizardCreatorService: WizardCreatorService) {

  }
  
  ngOnInit(): void {
   this.setListeners();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._wizardCreatorService.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.isLoading = false;
      if (r)
        {
          this.docContent += r;
        }
    })
  }

  saveEditorChanges() {
    // this._docService.update(this.documentId, this.docContent).subscribe();
  }

  updateEditedContent(content: string) {
    this.docContent = content;
  }
}
