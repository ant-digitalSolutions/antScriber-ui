import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-generate-full-article-for-blog-text-field',
  templateUrl: './generate-full-article-for-blog-text-field.component.html',
  styleUrls: ['./generate-full-article-for-blog-text-field.component.scss']
})
export class GenerateFullArticleForBlogTextFieldComponent implements OnChanges {
  @Input()
  fieldValue?: string;

  @Input()
  fieldHumanName: string;

  @Output()
  generateValueEvent = new EventEmitter();

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  inEdition = false;

  isLoading = false;

  toggleFieldEditionStatus() {
    this.inEdition = !this.inEdition;
  }

  generateArticleSEoMetaDescription() {
    this.isLoading = true;
    this.generateValueEvent.emit();
  }

  editValue() {
    this.valueEditedEvent.emit(this.fieldValue);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fieldValue']) {
      this.isLoading = false;
    }
  }

}
