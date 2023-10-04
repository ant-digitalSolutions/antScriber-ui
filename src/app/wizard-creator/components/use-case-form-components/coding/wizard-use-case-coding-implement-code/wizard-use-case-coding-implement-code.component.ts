import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconBrandTypescript } from 'angular-tabler-icons/icons';
import { Validators } from 'ngx-editor';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';

@Component({
  selector: 'app-wizard-use-case-coding-implement-code',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styleUrls: [
    './wizard-use-case-coding-implement-code.component.scss',
    '../../use-case-form-base/use-case-form-base.component.scss']
})
export class WizardUseCaseCodingImplementCodeComponent extends UseCaseFormBaseComponent {

  override setTextFieldsData(): void {
    const fields: TextFieldToRenderData[] = [];

    fields.push({
      placeholder: 'The specific programming language for the code. [E.g., "Python"]',
      fieldLabel: 'Programming Lang',
      fieldValue: '',
      validators: [Validators.required(), Validators.maxLength(20)],
      inputMaxLen: 20,
      dataName: 'programmingLang'
    })

    fields.push({
      placeholder: 'If any, specific framework is to be used. [E.g., "Django"]',
      fieldLabel: 'Framework',
      fieldValue: '',
      validators: [Validators.maxLength(20)],
      inputMaxLen: 20,
      dataName: 'framework'
    })

    fields.push({
      placeholder: 'Any pre-existing code that needs to be incorporated or considered.',
      fieldLabel: 'Additional Code',
      fieldValue: '',
      validators: [Validators.maxLength(4000)],
      inputMaxLen: 4000,
      dataName: 'additionalCode',
      isLongText: true
    })

    fields.push({
      placeholder: 'E.g., "Generate a function that sorts an array in descending order"',
      fieldLabel: 'Instruction',
      fieldValue: '',
      validators: [Validators.required(), Validators.minLength(10), Validators.maxLength(4000)],
      inputMaxLen: 4000,
      dataName: 'instruction',
      isLongText: true
    });
    

    this._wizardFormService.updateFormDefaultField_Text(fields);
  }

  override setCheckboxFieldsData(): void {
    const fields: CheckboxFieldToRenderData[] = [];

    fields.push({
      fieldLabel: 'Explain code',
      fieldValue: false,
      dataName: 'explainCode'
    })

    this._wizardFormService.updateFormDefaultField_Checkboxes(fields);
  }
}