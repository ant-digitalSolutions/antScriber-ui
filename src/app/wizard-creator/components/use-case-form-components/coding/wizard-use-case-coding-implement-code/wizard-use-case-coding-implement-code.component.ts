import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconBrandTypescript } from 'angular-tabler-icons/icons';
import { Validators } from 'ngx-editor';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-use-case-coding-implement-code',
  templateUrl: './wizard-use-case-coding-implement-code.component.html',
  styleUrls: ['./wizard-use-case-coding-implement-code.component.scss']
})
export class WizardUseCaseCodingImplementCodeComponent implements OnInit, OnDestroy {


  textFields: TextFieldToRenderData[];
  checkboxFields: CheckboxFieldToRenderData[];

  constructor(
    private _wizardForm: WizardFormService) { }


  ngOnInit(): void {
    this.setNeededFields();
  }

  ngOnDestroy(): void {
  }

  setNeededFields() {
    this.textFields = [];
    this.checkboxFields = [];

    this.textFields.push({
      placeholder: 'The specific programming language for the code. [E.g., "Python"]',
      fieldLabel: 'Programming Lang',
      fieldValue: '',
      validators: [Validators.required(), Validators.maxLength(20)],
      inputMaxLen: 20,
      dataName: 'programmingLang'
    })

    this.textFields.push({
      placeholder: 'If any, specific framework is to be used. [E.g., "Django"]',
      fieldLabel: 'Framework',
      fieldValue: '',
      validators: [Validators.maxLength(20)],
      inputMaxLen: 20,
      dataName: 'framework'
    })

    this.textFields.push({
      placeholder: 'Any pre-existing code that needs to be incorporated or considered.',
      fieldLabel: 'Additional Code',
      fieldValue: '',
      validators: [Validators.maxLength(4000)],
      inputMaxLen: 4000,
      dataName: 'additionalCode',
      isLongText: true
    })

    this.textFields.push({
      placeholder: 'E.g., "Generate a function that sorts an array in descending order"',
      fieldLabel: 'Instruction',
      fieldValue: '',
      validators: [Validators.required(), Validators.minLength(10), Validators.maxLength(4000)],
      inputMaxLen: 4000,
      dataName: 'instruction',
      isLongText: true
    });

    this.checkboxFields.push({
      fieldLabel: 'Explain code',
      fieldValue: false,
      dataName: 'explainCode'
    })
  }

  
  textFieldData(dataName: string) : TextFieldToRenderData  {
    const data = this.textFields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  checkBoxFieldData(dataName: string): CheckboxFieldToRenderData {
    const data = this.checkboxFields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }
  
}