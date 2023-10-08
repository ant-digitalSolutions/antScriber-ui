import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { WizardDefaultFieldNamesEnum } from '../enums/wizard-default-fields-names.enum';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { CacheService } from 'src/app/common/services/cache/cache.service';

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

  // emit when the user click an option of the button toggle of the forms
  private _buttonToggleUpdate = new BehaviorSubject<string>('');
  buttonToggleUpdate$ = this._buttonToggleUpdate.asObservable();

  // emit when the user wants to reset the form data to its default values.
  private _resetFieldsToDefault = new Subject<void>();
  resetFieldsToDefault$ = this._resetFieldsToDefault.asObservable();

// emit if the user has available data in cache from their last section
  private _wizardFormFieldDataFromCache = new ReplaySubject<{
    fieldName: string,
    fieldValue: any
  }>(undefined as any);
  wizardFormFieldDataFromCache$ = this._wizardFormFieldDataFromCache.asObservable();

  _formAdditionalData: any = {};

  /**
   * Contains the name of the fields to be shown in the wizard form.
   *
   * @type {string[]}
   * @memberof WizardFormService
   */
  _defaultFieldsToRenderOnForm: string[] = [];

  // fields to render in the form. The values of these fields
  // are based on the current use case. The responsibility to set
  // these values are on each use-case specific component
  private _textFieldsToRender: TextFieldToRenderData[];
  private _checkboxFieldsToRender: CheckboxFieldToRenderData[];
  private _selectorFieldsToRender: SelectorFieldToRenderData[];
  private _buttonToggleFieldToRender: SelectorFieldToRenderData;

  /**
   * Contains the list of names of the fields to render in the form of a given
   * use case. This is necessary in other to modify the data to render after
   * the user clicks in a button toggle.
   *
   * @memberof WizardFormService
   */
  _fieldNamesToRender = new Map<string, void>();



  constructor(private _cacheService: CacheService) { }


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
  // TODO: Change name to checkDataError()
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
   * This method is called every time a value of a wizard
   * form field is updated
   *
   * @param {string} fieldName
   * @param {*} fieldValue
   * @memberof WizardFormService
   */
  // TODO: change name to updateData() 
  updateAdditionalData(fieldName: string, fieldValue: any) {
    this._formAdditionalData[fieldName] = fieldValue;
    this._cacheService.updateWizardFormData(this._formAdditionalData);
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
    this._fieldNamesToRender.clear();
  }

  /**
   * Returns the value of the field in the additionalData object
   * which name match with the given name
   *
   * @param {string} dataName
   * @return {*}  {*}
   * @memberof WizardFormService
   */
  // TODO: change name to getDataValue()
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
   * @mem berof WizardFormService
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
    // return this._defaultFieldsToRenderOnForm.indexOf(fieldName) >= 0;
    return this._fieldNamesToRender.has(fieldName);
  }

  /**
   * Update the default fields to render in the form by
   * addigin or deleting an element with the given name
   *
   * @param {WizardDefaultFieldNamesEnum} fields Name of the field to add or delete.
   * @param {('add' | 'del')} addOrDel Indicate if the given field should be added or deleted.
   * @return {*} 
   * @memberof WizardFormService
   */
  updateFormDefaultFieldsToRender(fields: WizardDefaultFieldNamesEnum[], addOrDel: 'add' | 'del') {
    // the case for rendering or hiding all the fields
    if (fields[0] === WizardDefaultFieldNamesEnum.ALL) {
      this._defaultFieldsToRenderOnForm = [];
      this._fieldNamesToRender.clear();

      if (addOrDel === 'add') {
        Object.values(WizardDefaultFieldNamesEnum).forEach(v => {
          this._defaultFieldsToRenderOnForm.push(v);
          this._fieldNamesToRender.set(v)
        })
      }
      return;
    }

    // to rendering or hiding multiple fields
    if (addOrDel === 'add') {
      fields.forEach(field => {
        this._defaultFieldsToRenderOnForm.push(field);
        this._fieldNamesToRender.set(field)
      });
    } else {
      fields.forEach(field => {
        const indexToDelete = this._defaultFieldsToRenderOnForm.indexOf(field);

        if (indexToDelete >= 0) {
          this._defaultFieldsToRenderOnForm = this._defaultFieldsToRenderOnForm.splice(indexToDelete, 1);
          this._fieldNamesToRender.delete(field);
        }
      });
    }

    this._fieldsToShowUpdate.next();
  }

  updateFormDefaultField_Text(fields: TextFieldToRenderData[]): void {
    this._textFieldsToRender = fields;
    fields.forEach(field => {
      this._fieldNamesToRender.set(field.dataName);
    });
  }

  updateFormDefaultField_Selectors(fields: SelectorFieldToRenderData[]): void {
    this._selectorFieldsToRender = fields;
    fields.forEach(field => {
      this._fieldNamesToRender.set(field.dataName);
    });
  }

  updateFormDefaultField_Checkboxes(fields: CheckboxFieldToRenderData[]): void {
    this._checkboxFieldsToRender = fields;
    fields.forEach(field => {
      this._fieldNamesToRender.set(field.dataName);
    });
  }

  updateFormDefaultField_ButtonToggle(fields: SelectorFieldToRenderData): void {
    this._buttonToggleFieldToRender = fields;
      this._fieldNamesToRender.set(fields.dataName);
  }

  hideFieldFromForm(fieldNames: string[]) {
    fieldNames.forEach(fieldName => {
      this._fieldNamesToRender.delete(fieldName);
    });
  }

  showFieldInForm(fieldNames: string[]) {
    fieldNames.forEach(fieldName => {
      this._fieldNamesToRender.set(fieldName);
    });
  }

  /**
   * Set the wizard form data with the data of the latest section
   * from the user.
   *
   * @param {*} latestFormData
   * @memberof WizardFormService
   */
  setWizardFormData(latestFormData: any) {
    Object.keys(latestFormData).forEach(fieldName => {
      const fieldValue = latestFormData[fieldName];
      this._wizardFormFieldDataFromCache.next({
        fieldName,
        fieldValue
      })
    });
  }

  /**
   * Used to reset the wizard form data to the default values.
   *
   * @memberof WizardFormService
   */
  resetFormData() {
   this._resetFieldsToDefault.next();
  }


  public get textFieldsToRender(): TextFieldToRenderData[] {
    if (!this._textFieldsToRender) {
      return [];
    }
    const output: TextFieldToRenderData[] = [];
    this._textFieldsToRender.forEach(field => {
      if (this.checkIfFieldShouldRender(field.dataName)) {
        output.push(field);
      }
    });
    return output;
  }

  public get selectorFieldsToRender(): SelectorFieldToRenderData[] {
    if (!this._selectorFieldsToRender) {
      return [];
    }
    const output: SelectorFieldToRenderData[] = [];
    this._selectorFieldsToRender.forEach(field => {
      if (this.checkIfFieldShouldRender(field.dataName)) {
        output.push(field);
      }
    });
    return output;
  }

  public get checkboxFieldsToRender(): CheckboxFieldToRenderData[] {
    if (!this._checkboxFieldsToRender) {
      return [];
    }
    const output: CheckboxFieldToRenderData[] = [];
    this._checkboxFieldsToRender.forEach(field => {
      if (this.checkIfFieldShouldRender(field.dataName)) {
        output.push(field);
      }
    });
    return output;
  }

  public get buttonToggleFieldToRender(): SelectorFieldToRenderData {
    return this._buttonToggleFieldToRender;
  }

  public get additionalData(): any {
    return this._formAdditionalData;
  }


}
