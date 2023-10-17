import { InlineEditor } from '@ckeditor/ckeditor5-editor-inline';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
// import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { configs_UI } from 'src/app/common/configs/ui.config';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { el } from 'date-fns/locale';




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
  newContentSeparatorElement = '<div class="new-content"><span>New Content</span></div>';

  _documentContent: string;

  @ViewChild('documentEditor') documentEditorRef: ElementRef;

  _docMarginTopNumber = 0;

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

  ngAfterViewInit(): void {
    this.initEditor();
  }

  initEditor() {
    if (this.documentEditorRef.nativeElement) {
      const ed = Editor.create(this.documentEditorRef.nativeElement, defaultConfig)
        .then(editor => {
          editor.setData(this._documentContent ? this._documentContent : '')
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
        if (d)
          if (this._editor)
            this._editor.setData(d.content);
          else
            this._documentContent = d.content
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
      newContentElement.scrollIntoView()
    }


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
      currentData += `<p>---</p>`
    }

    //  this._docService.documentInEdition!.content += newContent;
    currentData += newContent;
    this._editor.setData(currentData);
    this.newContentAmount++;

    this.setEditorScrollEvent();
  }

  setEditorScrollEvent() {
    const editorRef = document.getElementById('document-editor');
    if (editorRef)
      editorRef.addEventListener('scroll', () => this.removeNewContentIndicator());
  }

  removeNewContentIndicator() {
    const newContentElement = document.querySelector('.new-content');
    if (newContentElement) {
      const elementRect = newContentElement.getBoundingClientRect();
      const toRemove = elementRect.top <= (configs_UI.internal_navbar_height + configs_UI.main_navbar_height + 40 + 100);
      if (toRemove) {
        setTimeout(() => {
          let editorData = this._editor.getData() as string;
          editorData = editorData.replace(this.newContentSeparatorElement, '')
          this._editor.setData(editorData);
        }, 5000)
      }
    }
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
        classes: ['new-content', 'not-seen']
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
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Saved', data);

    });
  });
}