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

  private _buttonToggleUpdate = new Subject<string>();
  buttonToggleUpdate$ = this._buttonToggleUpdate.asObservable();

  _formAdditionalData: any = {};



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

  /**
   * Add or update a field the additionalData object
   * that is send in the wizard creator request.
   *
   * @param {string} fieldName
   * @param {*} fieldValue
   * @memberof WizardFormService
   */
  updateAdditionalData(fieldName: string, fieldValue: any) {
    this._formAdditionalData[fieldName] = fieldValue;
  }

  /**
   * Emit when there is an update in a button toggle element.
   *
   * @param {string} dataName
   * @memberof WizardFormService
   */
  buttonToggleUpdate(dataName: string) {
    this._buttonToggleUpdate.next(dataName)
  }

  cleanData() {
    this._additionalDataFormFields = [];
    this._formAdditionalData = {};
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

  /**
   * Returns the value of the field in the additionalData object
   * which name match with the given name
   *
   * @param {string} dataName
   * @return {*}  {*}
   * @memberof WizardFormService
   */
  additionalDataFieldValue(dataName: string): any {
    if (Object.keys(this._formAdditionalData).indexOf(dataName) >= 0) {
      return this._formAdditionalData[dataName];
    } 

    return undefined;
  }

  /**
   * Remove the data from the additionalData object and
   * any other state object.
   * 
   * Use this method when using conditional elements in the form view of
   * an specific use-case.
   *
   * @param {string} fieldName
   * @memberof WizardFormService
   */
  removeFieldFromAdditionalData(fieldName: string): void {
    if (Object.keys(this._formAdditionalData).indexOf(fieldName) >= 0) {
      delete this._formAdditionalData[fieldName];
    }

    this._additionalDataFormFields = this._additionalDataFormFields.filter(field => field.fieldName !== fieldName);
  }

  
  public get additionalData() : any {
    return this._formAdditionalData;
  }
  
  
}
