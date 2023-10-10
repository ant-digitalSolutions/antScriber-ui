import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { configs_UI } from 'src/app/common/configs/ui.config';

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

  ngAfterViewInit(): void {
    this.setScrollListener()
  }

  setListerners() {
    this._docService.documentInEdition$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(doc => {
        if (doc) {
          this.docNameForm = new FormControl(doc.name, [Validators.required(), Validators.maxLength(200)])
        }
      })

    this._docService.newDocUpdate$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.newContentAmount++;
      })
  }

  saveEditorChanges() {
    this._docService.update(this.documentId,{ content: this.documentContent }).subscribe();
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

  @HostListener('body:scroll')
  innerScroll() {
    console.log('inside scroll')
  }

  /**
   * Event to listen to the scroll event of the doc-editor container
   *
   * @memberof DocumentEditorComponent
   */
  setScrollListener() {
    var editorContainer = document.getElementById("editor-element-container");
    if (editorContainer)
      editorContainer!.addEventListener("scroll", this.checkIfScrollTillBottom.bind(this), false)
  }

  /**
   * Check if the user reach the bottom of the screen
   * 
   * TODO: in the future this should be improved by checking if the new content inserted
   * in the docEditor has entered the screen
   *
   * @memberof DocumentEditorComponent
   */
  checkIfScrollTillBottom() {
    var editorContainer = document.getElementById("editor-element-container");
    var docEditor = document.getElementById("doc-editor");

    const scrollTop = editorContainer!.scrollTop + editorContainer!.clientHeight;
    const height = docEditor!.clientHeight;
    const totalHeight = height - configs_UI.internal_navbar_height - configs_UI.main_navbar_height - 100;
    if (scrollTop >= totalHeight) {
      this.newContentAmount = 0;
    }
  }



  setEditorHeight() {
    this.editorHeight = `${window.innerHeight - configs_UI.main_navbar_height - configs_UI.internal_navbar_height}px`;
  }

  newContentNotificationClick() {
    this.newContentAmount = 0;
    this.scrollToBottom();
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
    const element = document.getElementById('editor-element-container')!;
    element.scrollTop = element.scrollHeight;
  }

  dismissNewContentNoti() {
    this.newContentAmount = 0;
  }


  public get documentContent(): string {
    if (this._docService.documentInEdition) {
      return this._docService.documentInEdition!.content;
    } else {
      return '';
    }
  }


  public set documentContent(v: string) {
    this._docService.documentInEdition!.content = v;
  }



}