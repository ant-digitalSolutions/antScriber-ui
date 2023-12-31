import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-text-area-field-render-and-editor',
  templateUrl: './text-area-field-render-and-editor.component.html',
  styleUrls: ['./text-area-field-render-and-editor.component.scss']
})
export class TextAreaFieldRenderAndEditorComponent implements OnChanges, OnInit {

  @Input()
  fieldValue?: string | undefined;

  @Input()
  fieldHumanName: string;

  @Output()
  generateValueEvent = new EventEmitter();

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  /**
   * Indicate if the fields can be generated by AI.
   * 
   * If true, show the Generate button.
   *
   * @memberof TextAreaFieldRenderAndEditorComponent
   */
  @Input()
  isGenerator = false;

  @Input()
  inEdition = false;

  @Input()
  placeholder: string;

  /**
   * List of validation function to apply to the field.
   * 
   * This can be something like: [Validators.required, Validators.email()...]
   *
   * @type {any[]}
   * @memberof TextAreaFieldRenderAndEditorComponent
   */
  @Input()
  validators: any[] = [];

  /**
   * Indicate if the field should show the 
   * Edit and Save buttons
   *
   * @memberof TextAreaFieldRenderAndEditorComponent
   */
  @Input()
  showActions = true

  /**
   * Indicate if after a blur or save event, the field should be closed
   * and the content rendered in a <p> tag.
   *
   * @memberof TextAreaFieldRenderAndEditorComponent
   */
  @Input()
  autoToggleEdition = false;

  isLoading = false;

  labelType: FloatLabelType = 'always';

  fieldForm: FormControl;


  /**
   *
   */
  constructor(private toastr: ToastrService) {


  }

  ngOnInit(): void {
    this.fieldForm = new FormControl(this.fieldValue, this.validators)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fieldValue']) {
      this.isLoading = false;
    }
  }

  toggleFieldEditionStatus() {
    this.inEdition = !this.inEdition;
  }

  saveEdition() {
    if (this.fieldForm.valid) {
      this.valueEditedEvent.emit(this.fieldForm.value);

      if (this.autoToggleEdition)
        this.toggleFieldEditionStatus();
    } else {
      this.toastr.error('Please fix the errors')
    }
  }

  getErrorMessage() {
    if (this.fieldForm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.fieldForm.hasError('min')) {
      return 'The value is too short.';
    }
    if (this.fieldForm.hasError('minlength')) {
      return `Please, provide more context. The min length is: ${this.fieldForm.getError('minlength').requiredLength}`
    }
    if (this.fieldForm.hasError('maxlength')) {
      return `Your context is too long. The max length is: ${this.fieldForm.getError('maxlength').requiredLength}`

    }

    return 'There is an error in your input'
  }



  get showGenerateButton(): boolean {
    return this.isGenerator && (!this.fieldValue || this.fieldValue.length == 0);
  }


}
