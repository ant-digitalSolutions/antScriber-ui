import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardFormService {

  showDescriptionInput = true;

  showToneInput = true;

  showLangInput = true;

  showNumberOfVariantsToGenerate = true;

  showGptVersion = true;

  showCreativityInput = true;

  _additionalDataFormFields: {fieldName: string, formControl: FormControl}[] = [];

  /**
   * Emit the name of the field that contains an error.
   * The component that render the field should act.
   *
   * @private
   * @memberof WizardFormService
   */
  private _additionalDataFieldError = new Subject<string>();
  additionalDataFieldWithError$ = this._additionalDataFieldError.asObservable();

  private _fieldsToShowUpdate = new Subject<void>();
  fieldToRenderUpdate$ = this._fieldsToShowUpdate.asObservable();



  constructor() { }

  updateFieldsForCodingImplementCode() {
    this.showDescriptionInput = false;
    this.showToneInput = false;
    this.showLangInput = false;
    this.showNumberOfVariantsToGenerate = false;
    this._fieldsToShowUpdate.next();
  }

  
  /**
   * Each of the use-case specific component should register its fields through this 
   * function.
   *
   * @param {string} fieldName
   * @param {FormControl} formControl
   * @memberof WizardFormService
   */
  registerAdditionalDataFormField(fieldName: string, formControl: FormControl) {
    this._additionalDataFormFields.push({
      fieldName,
      formControl
    })
  }

  /**
   * Check if any of the additional data field has an error.
   * 
   * If does, then notify and return false.
   *
   * @return {*}  {boolean}
   * @memberof WizardFormService
   */
  checkAdditionalData() : boolean {
    let isValid = true;
    this._additionalDataFormFields.forEach(data => {
      if (!data.formControl.valid) {
        this._additionalDataFieldError.next(data.fieldName);
        isValid = false;
      }
    });

    return isValid;
  }

  cleanData() {
    this._additionalDataFormFields = [];
    this._fieldsToShowUpdate.next();
  }

  restoreDefaultFields() {
    this.showDescriptionInput = true;
    this.showToneInput = true;
    this.showLangInput = true;
    this.showNumberOfVariantsToGenerate = true;
    this.showGptVersion = true;
    this.showCreativityInput = true;
  }
  
}