import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IArticleFromAiResponseDto } from '../dtos/article-from-ai.dto';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

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
  emitter = new EventEmitter<IArticleFromAiResponseDto>();



  @Input()
  articleToEdit: IArticleFromAiResponseDto;

  ngOnInit(): void {
    this.form = new FormGroup({
      articleBody: new FormControl(
        { value: this.articleToEdit.body, disabled: false },
        Validators.required()
      ),
      title: new FormControl(this.articleToEdit.title, [Validators.required()])
    });
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  save() {
    const formData = this.form.value;
    this.articleToEdit.title = formData.title;
    this.articleToEdit.body = formData.articleBody;
    this.emitter.emit(this.articleToEdit);
  }

}
