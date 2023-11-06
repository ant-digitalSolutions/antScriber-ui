import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { Subject, takeUntil } from 'rxjs';
import { DocumentService } from '../../services/document.service';
// import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { configs_UI } from 'src/app/common/configs/ui.config';
import { DialogService } from 'src/app/dialogs/dialog.service';
import { UserInitializationWalkthroughTourStepsEnum } from 'src/app/walkthrough-tours/enums/walkthrough-tour-user-initialization-steps-id.enum';
import { UserInitTourService } from 'src/app/walkthrough-tours/user-init-tour.service';
import { DocumentDetailsDto } from '../../dtos/document-details.dto';




@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * The amount of new content added to the document.
   * 
   * When the user see the new content, reset it to 0.
   *
   * @type {number}
   * @memberof DocumentEditorComponent
   */
  newContentAmount: number = 0;

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  @Input()
  documentId: string;

  docNameForm: FormControl;

  editorHeight: string;

  _editor: Editor;

  newContentSeparatorElement = '<div class="new-content"><span>New</span></div>';

  editorContentSeparatorElement = '<div class="content-separator"></div>';

  docName: string;

  documentInEditionDetails: DocumentDetailsDto;


  _documentContent: string;

  @ViewChild('documentEditor') documentEditorRef: ElementRef;

  _docMarginTopNumber = 0;

  constructor(
    private _docService: DocumentService,
    private router: Router,
    private _route: ActivatedRoute,
    private _userInitTour: UserInitTourService,
    protected $gaService: GoogleAnalyticsService,
    private _dialogService: DialogService,) { }


  ngOnInit(): void {
    this.setListerners();
    this.setEditorHeight();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete();

    this._docService.cleanData();
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  initEditor() {
    if (this.documentEditorRef.nativeElement) {
      Editor.create(this.documentEditorRef.nativeElement, defaultConfig)
        .then(editor => {
          editor.setData(this._documentContent ? this._documentContent : '')
          this._editor = editor;
          editor.on('changed', this.saveEditorChanges);
          this._editor = editor;
        });
    }
  }

  setListerners() {
    this._docService.documentInEdition$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(doc => {

        if (doc) {
          this.docNameForm = new FormControl(doc.name, [Validators.required(), Validators.maxLength(200)])
        }
      })

    this._docService.newDocUpdate$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe((newContent) => {
        this.handleNewContent(newContent);
      })

    this._docService.documentInEdition$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(d => {
        if (d) {
          if (this._editor)
            this._editor.setData(d.content);
          else
            this._documentContent = d.content

          this.docName = d.name;
          this.documentInEditionDetails = d;
        }
      })


    this._userInitTour.walkthroughTouStepHideEvent$.pipe(takeUntil(this.componentDestroyed$), takeUntil(this._userInitTour.walkthroughTourEnded$))
      .subscribe(stepId => {
        if (stepId === UserInitializationWalkthroughTourStepsEnum.RenderAssistantResults) {
          this.goback();
        }
      })
  }

  documentEditorFocusEvent() {
    this._docMarginTopNumber = 40;
  }

  documentEditorOnBlurEvent() {
    this._docMarginTopNumber = 0;
    this.saveEditorChanges();
  }

  saveEditorChanges() {
    let editorData = this._editor.getData() as string;
    editorData = editorData.replace(this.newContentSeparatorElement, '');
    this._docService.update(this.documentId, { content: editorData }).subscribe();
  }

  updateDocName() {
    if (this.docNameForm.valid)
      this._docService.update(this.documentId, { name: this.docNameForm.value }).subscribe();
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
    this.editorHeight = `${window.innerHeight - this._docMarginTopNumber - configs_UI.main_navbar_height - configs_UI.internal_navbar_height}px`;
  }

  newContentNotificationClick() {
    this.newContentAmount = 0;
    this.scrollToBottom();
  }

  scrollToBottom() {
    const newContentElement = document.querySelector('#document-editor .new-content');
    if (newContentElement) {
      // newContentElement.scrollIntoView()
      // this.documentEditorRef.nativeElement.scrollTop = newContentElement.offsetTop;
      const parentElement = this.documentEditorRef.nativeElement;
      const newContentElement = parentElement.querySelector('.new-content');
      parentElement.scrollTo({
        top: newContentElement.offsetTop,
        behavior: 'smooth'
      });

      this.removeNewContentIndicator();
    }

    // const parentElement = this.documentEditorRef.nativeElement;
    // // const newContentElement = parentElement.querySelector('.new-content');
    // parentElement.scrollTop = 


  }

  dismissNewContentNoti() {
    this.newContentAmount = 0;
  }

  handleNewContent(newContent: string): void {
    // separator logic
    const editor = document.querySelector('#document-editor')!;
    const newContentSeparator = editor.querySelector('.new-content');
    let currentData = this._editor.getData();


    if (!newContentSeparator) {
      currentData += this.newContentSeparatorElement;
    } else {
      currentData += this.editorContentSeparatorElement;
    }

    //  this._docService.documentInEdition!.content += newContent;
    currentData += this.newContentWrapper(newContent);
    this._editor.setData(currentData);
    this.newContentAmount++;

    this.setEditorScrollEvent();
    this.saveEditorChanges();
  }

  setEditorScrollEvent() {
    const editorRef = document.getElementById('document-editor');
    if (editorRef)
      editorRef.addEventListener('scroll', () => this.listenScrollToRemoveNewContentIndicator());
  }

  listenScrollToRemoveNewContentIndicator() {
    const newContentElement = document.querySelector('.new-content');
    if (newContentElement) {
      const elementRect = newContentElement.getBoundingClientRect();
      const toRemove = elementRect.top <= (configs_UI.internal_navbar_height + configs_UI.main_navbar_height + 40 + 100);
      if (toRemove) {
        this.removeNewContentIndicator()
      }
    }
  }

  removeNewContentIndicator() {
    this.newContentAmount = 0;
    setTimeout(() => {
      let editorData = this._editor.getData() as string;
      editorData = editorData.replace(this.newContentSeparatorElement, this.editorContentSeparatorElement)
      this._editor.setData(editorData);
    }, 5000)
  }

  newContentWrapper(newContent: string): string {
    return `
    <div class="editor-generated-content">
    ${newContent}
    </div>
    `
  }

  openDeleteDialog() {
    this.$gaService.event('doc_edition_options', 'delete_element', 'open_dialog');
    const dialogMessage =
      'Are you sure you want to permanently delete this document?';

    this._dialogService.openConfirmationDialog({
      okBtnText: 'Yes',
      cancelBtnText: 'No',
      message: dialogMessage
    })
      .afterClosed()
      .subscribe(r => {
        if (r) {
          this.$gaService.event('doc_edition_options', 'delete_element', 'confirm');

          this._docService.deleteDoc(this.documentInEditionDetails.uuid).subscribe(r => {
            if (r.success) {
              this.goback()
            }
          });

        }
        this.$gaService.event('doc_edition_options', 'delete_element', 'cancel');
      })
  }

  openRenameDialog() {
    this.$gaService.event('doc_edition_options', 'rename_element', 'open_dialog');

    this._dialogService.openDialogWithSingleInput_v2(
      {
        title: 'Rename Document',
        labelText: 'Document Name',
        value: this.documentInEditionDetails.name,
        okBtnText: 'Rename',
        placeholder: 'The name for your doc'
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.$gaService.event('doc_edition_options', 'rename_element', 'confirm');
          this._docService.update(this.documentInEditionDetails.uuid, { name: result }).subscribe(r => {
            if (r) {
              this.docName = result;
            }
          });
        }
        this.$gaService.event('doc_edition_options', 'rename_element', 'cancel');


      });
  }

}



const defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      // 'link',
      'bulletedList',
      'numberedList',
      // 'todoList',
      // 'horizontalLine',
      // 'code',
      // 'codeBlock',
      // 'blockQuote',
      // 'insertTable',
      // 'htmlEmbed',
      'undo',
      'redo'
    ]
  },
  language: 'en',
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  htmlSupport: {
    allow: [
      {
        name: 'div',
        classes: ['new-content', 'not-seen', 'content-separator', 'editor-generated-content']
      }, {
        name: 'span',
        classes: ['new-content', 'not-seen']
      },
    ]
  },
  autosave: {
    waitingTime: 500, // in ms
    save(editor: any) {
      return saveData(editor.getData());
    }
  },
};

function saveData(data: any) {
  return new Promise(() => {
    setTimeout(() => {
      console.log('Saved', data);

    });
  });
}