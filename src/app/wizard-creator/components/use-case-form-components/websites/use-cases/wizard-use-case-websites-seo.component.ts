import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { Validators } from '@angular/forms';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';

@Component({
  selector: 'app-wizard-use-case-websites-seo',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styles: [
  ]
})
export class WizardUseCaseWebsitesSeoComponent extends UseCaseFormBaseComponent {

  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g., "About Us"',
      fieldLabel: 'Name of Webpage',
      fieldValue: '',
      validators: [Validators.maxLength(50), Validators.required],
      inputMaxLen: 50,
      dataName: 'webpageName',
      tooltipText: `Enter the name of the webpage you're showcasing.`,
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g., "antScribe Innovations"',
      fieldLabel: 'Name of Business/Product (Optional)',
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
      fieldLabel: 'Keywords (Optional)',
      fieldValue: '',
      validators: [Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'keywords',
      tooltipText: 'List relevant keywords that represent the webpage. Use commas to separate them. Keywords improve SEO and webpage visibility.',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g., "Marketing Agencies seeking automated content tools"',
      fieldLabel: 'Target Audience Insights (Optional)',
      fieldValue: '',
      validators: [Validators.maxLength(150)],
      inputMaxLen: 150,
      dataName: 'targetAudience',
      tooltipText: 'Who are you targeting? Describe their attributes or preferences. This helps in refining the content appeal.',
      isLongText: false
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setButtonToggleData(): void {
    const fieldsData = {
      dataName: 'typeOfContent',
      fieldLabel: 'Content Type',
      fieldValue: 'MetaDescription',
      tooltipText: 'Select the type of content.',
      values: [
        {
          value: 'MetaDescription',
          text: 'Meta Description'
        },
        {
          value: 'Excerpt',
          text: 'Excerpt'
        },
        {
          value: 'MetaTags',
          text: 'Meta Tags'
        }
      ]
    }
    this._wizardFormService.updateFormDefaultField_ButtonToggle(fieldsData);
  }
}
