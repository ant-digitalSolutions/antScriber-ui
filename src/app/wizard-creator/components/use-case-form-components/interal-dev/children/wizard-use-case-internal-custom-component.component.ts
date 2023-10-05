import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';

@Component({
  selector: 'app-wizard-use-case-internal-custom-component',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styles: [
  ]
})
export class WizardUseCaseInternalCustomComponentComponent extends UseCaseFormBaseComponent {

  override setTextFieldsData(): void {
    const fields: TextFieldToRenderData[] = [];

    fields.push({
      placeholder: 'E.g: customInstruction: Custom instruction from the user',
      fieldLabel: 'Text Field Data',
      fieldValue: ``,
      validators: [],
      inputMaxLen: 1000,
      dataName: 'dataToGenerate',
      tooltipText: 'Contains the definition of the fields of type text',
      isLongText: true
    });

    this._wizardFormService.updateFormDefaultField_Text(fields);
  }

  override setButtonToggleData(): void {
    const field = {
      dataName: 'typeOfData',
      fieldLabel: 'Type Of Data',
      fieldValue: 'textFields',
      tooltipText: 'Select the type of data to generate. This is the final method to be generated',
      values: [
        {
          value: 'textFields',
          text: 'Text Fields'
        },
        {
          value: 'selectorFields',
          text: 'Selector Fields'
        }
      ]
    }

    this._wizardFormService.updateFormDefaultField_ButtonToggle(field);
  }

}
