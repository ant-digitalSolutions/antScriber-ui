import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { WizardDefaultFieldNamesEnum } from '../enums/wizard-default-fields-names.enum';

@Injectable()
export class WizardFormService {


  _additionalDataFormFields: { fieldName: string, formControl: FormControl }[] = [];

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

  /**
   * Contains the name of the fields to be shown in the wizard form.
   *
   * @type {string[]}
   * @memberof WizardFormService
   */
  _defaultFieldsToRenderOnForm: string[] = [];


  constructor() { }


  /**
   * Each of the use-case specific component should register its fields through this 
   * function.
   * 
   * This is used to check the validation of the fields before sending the data to the server.
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
   * Used to check if all the fields that are rendering now are valid.
   * If a fields is invalid, send an event so the field can show the error.
   *
   * @return {*}  {boolean}
   * @memberof WizardFormService
   */
  checkAdditionalData(): boolean {
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
   * Used so the fields of an specific use-case component can be updated
   * accordantly.
   *
   * @param {string} dataName
   * @memberof WizardFormService
   */
  buttonToggleUpdate(dataName: string) {
    this._buttonToggleUpdate.next(dataName)
  }

  /**
   * Clean all the data of the service.
   *
   * @memberof WizardFormService
   */
  cleanData() {
    this._additionalDataFormFields = [];
    this._formAdditionalData = {};
    this._defaultFieldsToRenderOnForm = [];
    this._fieldsToShowUpdate.next();
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

  /**
   * Check if the field with the given name can render in the wizard form.
   *
   * @param {string} fieldName
   * @return {*}  {boolean}
   * @memberof WizardFormService
   */
  checkIfFieldShouldRender(fieldName: string): boolean {
    return this._defaultFieldsToRenderOnForm.indexOf(fieldName) >= 0;
  }

  /**
   * Update the default fields to render in the form by
   * addigin or deleting an element with the given name
   *
   * @param {WizardDefaultFieldNamesEnum} field Name of the field to add or delete.
   * @param {('add' | 'del')} addOrDel Indicate if the given field should be added or deleted.
   * @return {*} 
   * @memberof WizardFormService
   */
  updateFormDefaultFieldsToRender(field: WizardDefaultFieldNamesEnum, addOrDel: 'add' | 'del') {
    if (field === WizardDefaultFieldNamesEnum.ALL) {
      this._defaultFieldsToRenderOnForm = [];

      if (addOrDel === 'add') {
        Object.values(WizardDefaultFieldNamesEnum).forEach(v => this._defaultFieldsToRenderOnForm.push(v))
      }
      return;
    }

    if (addOrDel === 'add') {
      this._defaultFieldsToRenderOnForm.push(field);
    } else {
      const indexToDelete = this._defaultFieldsToRenderOnForm.indexOf(field);

      if (indexToDelete >= 0) {
        this._defaultFieldsToRenderOnForm = this._defaultFieldsToRenderOnForm.splice(indexToDelete, 1);
      }
    }

    this._fieldsToShowUpdate.next();
  }


  public get additionalData(): any {
    return this._formAdditionalData;
  }


}
