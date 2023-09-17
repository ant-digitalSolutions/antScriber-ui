import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { ArticleService } from 'src/app/blogger/services/article.service';

@Component({
  selector: 'app-html-content-editor',
  templateUrl: './html-content-editor.component.html',
  styleUrls: ['./html-content-editor.component.scss']
})
export class HtmlContentEditorComponent implements OnInit, OnDestroy, OnChanges {




  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
  ];

  form: FormGroup;

  @Output()
  contentEditedEmitter = new EventEmitter<string>();



  @Input()
  contentToEdit: string | undefined;

  editedContent: string | undefined;

  editionMode = false;

  @Input()
  isLoading = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentToEdit'] && this.contentToEdit) {
      this.editedContent = this.contentToEdit;
    }
    if (changes['isLoading']) {
      if (!this.isLoading)
       this.editionMode = false;
    }
  }

  ngOnInit(): void {

    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  toggleEdition(): void {
    this.editionMode = !this.editionMode;
  }


  save() {
    this.isLoading = true;
    this.contentToEdit = this.editedContent;
    this.contentEditedEmitter.emit(this.contentToEdit);
  }

  discard() {
    this.editedContent = this.contentToEdit;
    this.toggleEdition()
  }

  editContentWithMagic(editedContent: string) {
    this.editedContent = editedContent;
  }

  changeLoadingState(magicIsLoading: boolean) {
   this.isLoading = magicIsLoading;
  }

}
