import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { EventsHubService } from 'src/app/events-hub/events-hub.service';
import { EventType } from 'src/app/events-hub/enums/event-type.enum';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
})
export class DocumentEditorComponent
  implements OnInit, OnDestroy, AfterViewInit
{
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

  newContentSeparatorElement =
    '<div class="new-content"><span>New</span></div>';

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
    private _dialogService: DialogService,
    private _eventHub: EventsHubService
  ) {}

  ngOnInit(): void {
    this.setListerners();
    this.setEditorHeight();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();

    this._docService.cleanData();
  }

  ngAfterViewInit(): void {
    this.initEditor();
  }

  initEditor() {
    if (this.documentEditorRef.nativeElement) {
      Editor.create(this.documentEditorRef.nativeElement, defaultConfig).then(
        (editor) => {
          editor.setData(this._documentContent ? this._documentContent : '');
          this._editor = editor;
          editor.on('changed', this.saveEditorChanges);
          this._editor = editor;

          editor.model.schema.extend('paragraph', {
            allowAttributes: ['class'],
          });

          editor.model.schema.register('div', {
            allowAttributes: ['class'],
            allowIn: '$root',
            isBlock: true,
          });

          editor.model.schema.register('span', {
            allowAttributes: ['class'],
            allowIn: '$root',
            isBlock: false,
          });

          editor.conversion.attributeToAttribute({
            model: 'class',
            view: 'class',
          });

          editor.conversion.elementToElement({
            model: 'div',
            view: 'div',
          });

          editor.conversion.elementToElement({
            model: 'span',
            view: 'span',
          });
        }
      );
    }
  }

  setListerners() {
    this._docService.documentInEdition$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((doc) => {
        if (doc) {
          this.docNameForm = new FormControl(doc.name, [
            Validators.required(),
            Validators.maxLength(200),
          ]);
        }
      });

    this._eventHub.EventEmitter.pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe((e) => {
      if (e.type === EventType.wizardResponseChunk)
        this.addChunkResponse(e.data.responseText);
      if (e.type === EventType.documentSetUpForResponse)
        this.setUpForNewContent();
    });

    this._docService.documentInEdition$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((d) => {
        if (d) {
          if (this._editor) this._editor.setData(d.content);
          else this._documentContent = d.content;

          this.docName = d.name;
          this.documentInEditionDetails = d;
        }
      });

    this._userInitTour.walkthroughTouStepHideEvent$
      .pipe(
        takeUntil(this.componentDestroyed$),
        takeUntil(this._userInitTour.walkthroughTourEnded$)
      )
      .subscribe((stepId) => {
        if (
          stepId ===
          UserInitializationWalkthroughTourStepsEnum.RenderAssistantResults
        ) {
          this.goback();
        }
      });
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
    this._docService
      .update(this.documentId, { content: editorData })
      .subscribe();
  }

  updateDocName() {
    if (this.docNameForm.valid)
      this._docService
        .update(this.documentId, { name: this.docNameForm.value })
        .subscribe();
    console.log('After blur');
  }

  goback() {
    this.saveEditorChanges();
    const queryParams = this._route.snapshot.queryParams;

    const newQueryParams = {
      ...queryParams,
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
    this.editorHeight = `${
      window.innerHeight -
      this._docMarginTopNumber -
      configs_UI.main_navbar_height -
      configs_UI.internal_navbar_height
    }px`;
  }

  newContentNotificationClick() {
    this.newContentAmount = 0;
    this.scrollToBottom();
  }

  scrollToBottom() {
    const newContentElement = document.querySelector(
      '#document-editor .new-content'
    );
    if (newContentElement) {
      // newContentElement.scrollIntoView()
      // this.documentEditorRef.nativeElement.scrollTop = newContentElement.offsetTop;
      const parentElement = this.documentEditorRef.nativeElement;
      const newContentElement = parentElement.querySelector('.new-content');
      parentElement.scrollTo({
        top: newContentElement.offsetTop,
        behavior: 'smooth',
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

  /**
   * Append the text response at the end of the last paragraph.
   *
   *
   * @param {string} chunkText
   * @memberof DocumentEditorComponent
   */
  addChunkResponse(chunkText: string) {
    if (!chunkText) return;
    this._editor.model.change((writer) => {
      const root = this._editor.model.document.getRoot()!;
      const lastElement = root.getChild(root.childCount - 1);
      let position = this._editor.model.createPositionAt(lastElement!, 'end');

      // check if the chunk is the end of the variant (or response)
      if (chunkText.indexOf('...') >= 0) {
        this._insertParagraphNewVariant(writer, position);
        return;
      }

      if (chunkText.indexOf('\n') >= 0) {
        // Insert a softBreak
        writer.insertElement('softBreak', position);
      }

      // Insert text part
      writer.insertText(chunkText, position);

      // Update position to the end of the last inserted text
      position = this._editor.model.createPositionAt(lastElement!, 'end');

    });
  }

  /**
   * if the user requests multiple variants of responses,
   * Render each one into a paragraph
   *
   * @private
   * @param {*} writer
   * @param {*} position
   * @memberof DocumentEditorComponent
   */
  private _insertParagraphNewVariant(writer: any, position: any) {
    const breakElement = writer.createElement('paragraph', {
      class: 'wizard-variant',
    });
    writer.insert(breakElement, position);

    // Update position after the <br> element
    position = writer.createPositionAfter(breakElement);
  }

  /**
   * Insert a separator element at the end of the document
   *
   *
   * @memberof DocumentEditorComponent
   */
  setUpForNewContent(): void {
    // separator logic
    // TODO: if the doc has data, add the separator. Otherwise don't do nothing

    this._editor.model.change((writer) => {
      const root = this._editor.model.document.getRoot();

      const separator = writer.createElement('div');

      if (this.checkIfDocumentContainsNewContentIndicator()) {
        separator._setAttribute('class', 'content-separator');
      } else {
        separator._setAttribute('class', 'new-content');
        const newSpan = writer.createElement('span');
        const newText = writer.createText('New');
        writer.append(newText, newSpan);
        writer.append(newSpan, separator);
      }

      const paragraph = writer.createElement('paragraph', {
        class: 'wizard-variant variant-1',
      });
      // paragraph._setAttribute('class', 'editor-generated-content');

      writer.append(separator, root!);
      writer.append(paragraph, root!);
    });

    this.newContentAmount++;

    this.setEditorScrollEvent();
    this.saveEditorChanges();
  }

  checkIfDocumentContainsNewContentIndicator(): boolean {
    const model = this._editor.model;
    const root = model.document.getRoot()!;
    let containsClass = false;

    for (const node of root.getChildren()) {
      if (
        node.is('element') &&
        node.hasAttribute('class') &&
        (node.getAttribute('class') as string)
          .split(' ')
          .includes('new-content')
      ) {
        containsClass = true;
        break;
      }
    }

    return containsClass;
  }

  setEditorScrollEvent() {
    const editorRef = document.getElementById('document-editor');
    if (editorRef)
      editorRef.addEventListener('scroll', () =>
        this.listenScrollToRemoveNewContentIndicator()
      );
  }

  listenScrollToRemoveNewContentIndicator() {
    const newContentElement = document.querySelector('.new-content');
    if (newContentElement) {
      const elementRect = newContentElement.getBoundingClientRect();
      const toRemove =
        elementRect.top <=
        configs_UI.internal_navbar_height +
          configs_UI.main_navbar_height +
          40 +
          100;
      if (toRemove) {
        this.removeNewContentIndicator();
      }
    }
  }

  removeNewContentIndicator() {
    this.newContentAmount = 0;
    setTimeout(() => {
      let editorData = this._editor.getData() as string;
      editorData = editorData.replace(
        this.newContentSeparatorElement,
        this.editorContentSeparatorElement
      );
      this._editor.setData(editorData);
    }, 5000);
  }

  newContentWrapper(newContent: string): string {
    return `
    <div class="editor-generated-content">
    ${newContent}
    </div>
    `;
  }

  openDeleteDialog() {
    this.$gaService.event(
      'doc_edition_options',
      'delete_element',
      'open_dialog'
    );
    const dialogMessage =
      'Are you sure you want to permanently delete this document?';

    this._dialogService
      .openConfirmationDialog({
        okBtnText: 'Yes',
        cancelBtnText: 'No',
        message: dialogMessage,
      })
      .afterClosed()
      .subscribe((r) => {
        if (r) {
          this.$gaService.event(
            'doc_edition_options',
            'delete_element',
            'confirm'
          );

          this._docService
            .deleteDoc(this.documentInEditionDetails.uuid)
            .subscribe((r) => {
              if (r.success) {
                this.goback();
              }
            });
        }
        this.$gaService.event(
          'doc_edition_options',
          'delete_element',
          'cancel'
        );
      });
  }

  openRenameDialog() {
    this.$gaService.event(
      'doc_edition_options',
      'rename_element',
      'open_dialog'
    );

    this._dialogService
      .openDialogWithSingleInput_v2({
        title: 'Rename Document',
        labelText: 'Document Name',
        value: this.documentInEditionDetails.name,
        okBtnText: 'Rename',
        placeholder: 'The name for your doc',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.$gaService.event(
            'doc_edition_options',
            'rename_element',
            'confirm'
          );
          this._docService
            .update(this.documentInEditionDetails.uuid, { name: result })
            .subscribe((r) => {
              if (r) {
                this.docName = result;
              }
            });
        }
        this.$gaService.event(
          'doc_edition_options',
          'rename_element',
          'cancel'
        );
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
      'redo',
    ],
  },
  language: 'en',
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  htmlSupport: {
    allow: [
      {
        name: 'div',
        classes: [
          'new-content',
          'not-seen',
          'content-separator',
          'editor-generated-content',
        ],
      },
      {
        name: 'span',
        classes: ['new-content', 'not-seen'],
      },
    ],
  },
  autosave: {
    waitingTime: 500, // in ms
    save(editor: any) {
      return saveData(editor.getData());
    },
  },
};

function saveData(data: any) {
  return new Promise(() => {
    setTimeout(() => {
      console.log('Saved', data);
    });
  });
}
