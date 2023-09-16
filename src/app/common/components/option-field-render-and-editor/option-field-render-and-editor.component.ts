import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { OptionField } from '../../dto/option-field.dto';

@Component({
  selector: 'app-option-field-render-and-editor',
  templateUrl: './option-field-render-and-editor.component.html',
  styleUrls: ['./option-field-render-and-editor.component.scss']
})
export class OptionFieldRenderAndEditorComponent  {

  @Input()
  options: OptionField<any>[];

  @Input()
  selectedValue: any;

  @Input()
  fieldHumanName: string;

  @Output()
  selectionChangeEvent = new EventEmitter<any>();

  inEdition = false;

  toggleFieldEditionStatus() {
    this.inEdition = !this.inEdition;
  }

  selectionChange($event: MatSelectChange) {
    this.selectionChangeEvent.emit($event.value);

  }
}
