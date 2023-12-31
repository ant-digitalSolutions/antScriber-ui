import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { IArticleDetailsDto } from 'src/app/blogger/dto/article-details.dto';
import { ArticleService } from '../../services/article.service';

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
  emitter = new EventEmitter<IArticleDetailsDto>();



  @Input()
  articleToEdit: IArticleDetailsDto;

  constructor(private articleService: ArticleService) { }

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
    const dtoToEdit = {
      id: this.articleToEdit.id,
      body: this.articleToEdit.body,
      title: this.articleToEdit.title
    }
    this.articleService.updateArticle(dtoToEdit).subscribe()
    this.emitter.emit(this.articleToEdit);
  }

}
