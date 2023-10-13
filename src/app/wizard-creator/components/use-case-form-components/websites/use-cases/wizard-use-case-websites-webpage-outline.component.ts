import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { Validators } from '@angular/forms';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';

@Component({
  selector: 'app-wizard-use-case-websites-webpage-outline',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styles: [
  ]
})
export class WizardUseCaseWebsitesWebpageOutlineComponent extends UseCaseFormBaseComponent {
  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g., "antScribe Innovations"',
      fieldLabel: 'Name of Webpage/Business/Product',
      fieldValue: '',
      validators: [Validators.maxLength(50)],
      inputMaxLen: 50,
      dataName: 'businessOrProductName',
      tooltipText: `Enter the name of the webpage, business or the specific product you're showcasing.Keep it within 50 characters.`,
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g., "antScribe assists in generating high-quality content effortlessly for businesses..."',
      fieldLabel: 'Webpage Description',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(600), Validators.minLength(20)],
      inputMaxLen: 600,
      dataName: 'description',
      tooltipText: 'Describe the essence of this webpage. Aim for a length between 20 and 600 characters.',
      isLongText: true
    });

    fieldsData.push({
      placeholder: 'E.g., "antScribe, content generation, AI writing"',
      fieldLabel: 'Keywords',
      fieldValue: '',
      validators: [Validators.maxLength(250)],
      inputMaxLen: 250,
      dataName: 'keywords',
      tooltipText: 'List relevant keywords that represent the webpage. Use commas to separate them. Keywords improve SEO and webpage visibility.',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g., "Marketing Agencies seeking automated content tools"',
      fieldLabel: 'Description of Target Audience',
      fieldValue: '',
      validators: [Validators.maxLength(150)],
      inputMaxLen: 150,
      dataName: 'targetAudience',
      tooltipText: 'Who are you targeting? Describe their attributes or preferences. This helps in refining the content appeal. Stick to 150 characters max.',
      isLongText: false
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setCheckboxFieldsData(): void {
    const fields: CheckboxFieldToRenderData[] = [];

    fields.push({
      fieldLabel: 'Generate only Headlines',
      fieldValue: false,
      dataName: 'onlyHeadings'
    })

    this._wizardFormService.updateFormDefaultField_Checkboxes(fields);
  }
}
