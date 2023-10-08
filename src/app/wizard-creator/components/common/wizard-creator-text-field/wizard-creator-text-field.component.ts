import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
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

  showErrors = false;

  constructor(private toastr: ToastrService,
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
          this.fieldForm.markAsDirty();
          this.showErrors = true;
        }
      });

    this._wizardFormService.wizardFormFieldDataFromCache$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(data => {
        if (data.fieldName === this.fieldData.dataName) {
         this.fieldForm.setValue(data.fieldValue)
        }
      });
  }


  saveEdition() {
    if (this.fieldForm.valid) {
      this.valueEditedEvent.emit(this.fieldForm.value);
      this._wizardFormService.updateAdditionalData(this.fieldData.dataName, this.fieldForm.value);
    }
  }

  getErrorMessage() {
    if (this.fieldForm.hasError('required')) {
      return 'Please enter a value.';
    }
    if (this.fieldForm.hasError('min')) {
      return 'The value entered is too small. Provide more context';
    }
    if (this.fieldForm.hasError('minlength')) {
      return`Please provide more context. The minimum length is: ${this.fieldForm.getError('minlength').requiredLength}`;
    }
    if (this.fieldForm.hasError('maxlength')) {
      return `Your context is too long. The maximum length allowed is: ${this.fieldForm.getError('maxlength').requiredLength}`;
    }
    return 'An error occurred with your input.';
  }


  public get length(): number {
    return (this.fieldForm.value as string).length;
  }


  public get maxLen(): number {
    return this.fieldData.inputMaxLen;
  }


}
