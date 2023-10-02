import { Component, OnInit } from '@angular/core';
import { IconBrandTypescript } from 'angular-tabler-icons/icons';
import { Validators } from 'ngx-editor';
import { TextFieldToRenderData } from 'src/app/common/interfaces/field-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';

@Component({
  selector: 'app-wizard-use-case-coding-implement-code',
  templateUrl: './wizard-use-case-coding-implement-code.component.html',
  styleUrls: ['./wizard-use-case-coding-implement-code.component.scss']
})
export class WizardUseCaseCodingImplementCodeComponent implements OnInit {


  fields: TextFieldToRenderData[];

  constructor(private _wizard: WizardCreatorService) { }

  ngOnInit(): void {
    this.setNeededFields();
  }

  setNeededFields() {
    this.fields = [];

    this.fields.push({
      placeholder: 'The specific programming language for the code. [E.g., "Python"]',
      fieldLabel: 'Programming Lang',
      fieldValue: 'Typescript',
      validators: [Validators.required(), Validators.maxLength(20)],
      dataName: 'programmingLang'
    })

    this.fields.push({
      placeholder: 'If any, specific framework is to be used. [E.g., "Django"]',
      fieldLabel: 'Framework',
      fieldValue: 'Angular',
      validators: [Validators.maxLength(20)],
      dataName: 'framework'
    })

    this.fields.push({
      placeholder: 'Any pre-existing code that needs to be incorporated or considered.',
      fieldLabel: 'Additional Code',
      fieldValue: '',
      validators: [Validators.maxLength(4000)],
      dataName: 'additionalCode',
      isLongText: true
    })

    this.fields.push({
      placeholder: 'E.g., "Generate a function that sorts an array in descending order"',
      fieldLabel: 'Instruction',
      fieldValue: '',
      validators: [Validators.required(), Validators.minLength(10), Validators.maxLength(600)],
      dataName: 'instruction',
      isLongText: true
    })
  }

  
  fieldData(dataName: string) : TextFieldToRenderData {
    const data = this.fields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }
  
}