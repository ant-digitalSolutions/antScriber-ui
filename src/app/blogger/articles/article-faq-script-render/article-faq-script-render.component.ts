import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-article-faq-script-render',
  templateUrl: './article-faq-script-render.component.html',
  styleUrls: ['./article-faq-script-render.component.scss']
})
export class ArticleFaqScriptRenderComponent implements OnChanges{
  @Input()
  faqScript?: string;

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
    this.valueEditedEvent.emit(this.faqScript);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['faqScript']) {
      this.isLoading = false;
    }
  }
}
