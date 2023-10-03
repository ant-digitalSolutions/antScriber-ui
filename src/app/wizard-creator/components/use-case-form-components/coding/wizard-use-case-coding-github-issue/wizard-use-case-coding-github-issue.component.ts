import { label } from './../../../../../template-bundle/pages/apps/email/listing/categories';
import { Component } from '@angular/core';
import { Validators } from 'ngx-editor';
import { ButtonToggleToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-use-case-coding-github-issue',
  templateUrl: './wizard-use-case-coding-github-issue.component.html',
  styleUrls: ['./wizard-use-case-coding-github-issue.component.scss']
})
export class WizardUseCaseCodingGithubIssueComponent {
  textFields: TextFieldToRenderData[];
  checkboxFields: CheckboxFieldToRenderData[];
  buttonToggleFields: ButtonToggleToRenderData[];

  constructor(
    private _wizard: WizardCreatorService,
    private _wizardForm: WizardFormService) { }


  ngOnInit(): void {
    this._wizardForm.updateFieldsForCodingImplementCode();
    this._wizardForm.cleanData();
    this.setNeededFields();
  }

  ngOnDestroy(): void {
    this._wizardForm.restoreDefaultFields();
  }

  setNeededFields() {
    this.textFields = [];
    this.checkboxFields = [];
    this.buttonToggleFields = [];

    this.textFields.push({
      placeholder: 'Application crashes when clicking on Settings...',
      fieldLabel: 'Bug Description',
      fieldValue: '',
      validators: [Validators.maxLength(1000)],
      inputMaxLen: 1000,
      dataName: 'bugDescription',
      tooltipText: 'Detailed description of the encountered bug',
      isLongText: true
    })

    this.textFields.push({
      placeholder: 'Add a dark mode option...',
      fieldLabel: 'Feature Description',
      fieldValue: '',
      validators: [Validators.maxLength(1000)],
      inputMaxLen: 1000,
      dataName: 'featureDescription',
      tooltipText: 'Description of the feature being requested.',
      isLongText: true
    })


    this.textFields.push({
      placeholder: 'Avoid null reference when fetching user settings',
      fieldLabel: 'Bug Solution',
      fieldValue: '',
      validators: [Validators.maxLength(1000)],
      inputMaxLen: 1000,
      dataName: 'bugSolution',
      tooltipText: 'If known, a suggested solution or workaround for the bug.',
      isLongText: true
    })

    this.textFields.push({
      placeholder: 'Your code here',
      fieldLabel: 'Additional Code',
      fieldValue: '',
      validators: [Validators.maxLength(2000)],
      inputMaxLen: 2000,
      dataName: 'additionalCode',
      isLongText: true,
      tooltipText: 'Any pre-existing code that needs to be incorporated or considered.'
    });

    this.buttonToggleFields.push({
      dataName: 'typeOfIssue',
      fieldLabel: 'Type of Issue',
      fieldValue: 'featureRequest',
      tooltipText: 'Select the type of issue you want to create.',
      values: [
        {
          value: 'bugReport',
          text: 'Bug Report'
        },
        {
          value: 'featureRequest',
          text: 'Feature Request'
        }
      ]
    })
  }



  textFieldData(dataName: string): TextFieldToRenderData {
    const data = this.textFields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  buttonToggleData(dataName: string): ButtonToggleToRenderData {
    const data = this.buttonToggleFields.find(d => d.dataName === dataName);

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
