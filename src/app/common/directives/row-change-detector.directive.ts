import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[rowChangeDetector]'
})
export class RowChangeDetectorDirective {
  private lastRowCount = 0;

  @Output() rowChange = new EventEmitter<number>();

  constructor(private el: ElementRef<HTMLTextAreaElement>) {}

  @HostListener('input')
  onInput(): void {
    this.checkRows();
  }

  private checkRows(): void {
    const textarea = this.el.nativeElement;
    const currentRowCount = Math.floor(textarea.scrollHeight / (parseFloat(getComputedStyle(textarea).lineHeight)));

    if (currentRowCount !== this.lastRowCount) {
      this.lastRowCount = currentRowCount;
      this.rowChange.emit(currentRowCount);
    }
  }
}