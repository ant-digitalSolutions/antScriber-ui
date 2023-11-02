import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-creator-text-field',
  templateUrl: './wizard-creator-text-field.component.html',
  styleUrls: ['./wizard-creator-text-field.component.scss']
})
export class WizardCreatorTextFieldComponent {

  componentDestroyed$: Subject<boolean> = new Subject();

  @Input()
  fieldData: TextFieldToRenderData;

  isLoading = false;

  labelType: FloatLabelType = 'always';

  fieldForm: FormControl;

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  isRequired = false;

  constructor(
    private _wizardFormService: WizardFormService) {
  }

  ngOnInit(): void {
    this.fieldForm = new FormControl(this.fieldData.fieldValue, [...this.fieldData.validators]);

    this.isRequired = this.fieldForm.validator && this.fieldForm.validator({} as AbstractControl)?.['required'];

    this.setListeners();
    this._wizardFormService.registerAdditionalDataFormField(this.fieldData.dataName, this.fieldForm);
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    this._wizardFormService.removeFieldFromAdditionalData(this.fieldData.dataName);
  }

  setListeners() {
    this._wizardFormService.additionalDataFieldWithError$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(fieldName => {
        if (fieldName === this.fieldData.dataName) {
          this.fieldForm.markAsTouched();
          this.fieldForm.markAsDirty();
        }
      });

    this._wizardFormService.wizardFormFieldDataFromCache$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(data => {
        if (data.fieldName === this.fieldData.dataName) {
          this.fieldForm.setValue(data.fieldValue);
          this.saveEdition();
        }
      });

    this._wizardFormService.resetFieldsToDefault$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.fieldForm.setValue(this.fieldData.fieldValue);
        this.saveEdition();
      });
  }


  /**
   * Sync the field data with the data to send in the request
   *
   * @memberof WizardCreatorTextFieldComponent
   */
  saveEdition() {
    this.valueEditedEvent.emit(this.fieldForm.value);
    this._wizardFormService.updateAdditionalData(this.fieldData.dataName, this.fieldForm.value);
  }

  getErrorMessage() {
    if (this.fieldForm.hasError('required')) {
      return `Don't leave me hangin'! Required input.`;
    }
    if (this.fieldForm.hasError('min')) {
      return 'The value entered is too small. Provide more context';
    }
    if (this.fieldForm.hasError('minlength')) {
      return `Oops, it's a bit short! Please expand to at least ${this.fieldForm.getError('minlength').requiredLength} chars`;
    }
    if (this.fieldForm.hasError('maxlength')) {
      return `Please limit your input length to: ${this.fieldForm.getError('maxlength').requiredLength} chars.`;
    }
    return 'Please check your input.';
  }


  public get length(): number {
    return (this.fieldForm.value as string).length;
  }


  public get maxLen(): number {
    return this.fieldData.inputMaxLen;
  }

  public get showErrors(): boolean {
    return this.fieldForm.invalid && this.fieldForm.dirty;
  }


}
