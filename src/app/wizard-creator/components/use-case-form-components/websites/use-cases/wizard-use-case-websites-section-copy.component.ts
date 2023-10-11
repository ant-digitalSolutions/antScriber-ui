import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { Validators } from '@angular/forms';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';

@Component({
  selector: 'app-wizard-use-case-websites-section-copy',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styles: [
  ]
})
export class WizardUseCaseWebsitesSectionCopyComponent extends UseCaseFormBaseComponent {

  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g., antScribe Solutions',
      fieldLabel: 'Business/Product Name',
      fieldValue: '',
      validators: [Validators.maxLength(50)],
      inputMaxLen: 50,
      dataName: 'businessOrProductName',
      tooltipText: 'Provide the name of your business or product. Maximum length: 50 characters.',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g., antScribe is an innovative platform assisting users in crafting high-quality content effortlessly...',
      fieldLabel: 'Section Description',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(600), Validators.minLength(20)],
      inputMaxLen: 600,
      dataName: 'description',
      tooltipText: 'Provide a detailed description of this webpage section. It should be between 20 to 600 characters.',
      isLongText: true
    });

    fieldsData.push({
      placeholder: 'E.g., antScribe, virtual assistant',
      fieldLabel: 'Section Keywords',
      fieldValue: '',
      validators: [Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'keywords',
      tooltipText: 'Input relevant keywords for this section, separated by commas. This helps in SEO and searchability.',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g., Young professionals aged 25-34 interested in tech solutions',
      fieldLabel: 'Target Audience Description',
      fieldValue: '',
      validators: [Validators.maxLength(150)],
      inputMaxLen: 150,
      dataName: 'targetAudience',
      tooltipText: 'Define the primary audience for your content. Describe characteristics or interests to help tailor the output. Max: 150 characters.',
      isLongText: true
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setButtonToggleData(): void {
    const fieldsData = {
      dataName: 'contentStructure',
      fieldLabel: 'Content Structure',
      fieldValue: 'Paragraph',
      tooltipText: 'Choose the structure of the generated content',
      values: [
        {
          value: 'Paragraph',
          text: 'Paragraph'
        },
        {
          value: 'List',
          text: 'List'
        },
        {
          value: 'Sub-Sections',
          text: 'Sub-Sections'
        }
      ]
    };
    this._wizardFormService.updateFormDefaultField_ButtonToggle(fieldsData);
  }

  override setSelectorFieldsData(): void {
    const fieldsData: SelectorFieldToRenderData[] = [];

    fieldsData.push({
      fieldLabel: 'Desired Word Count',
      fieldValue: 'Brief (0-49 words)',
      dataName: 'wordsCount',
      tooltipText: 'Choose the desired word count range for the section.',
      values: [
        {
          value: '0-49',
          text: 'Brief (0-49 words)'
        },
        {
          value: '50-99',
          text: 'Short (50-99 words)'
        },
        {
          value: '100-149',
          text: 'Moderate (100-149 words)'
        },
        {
          value: '150-199',
          text: 'Lengthy (150-199 words)'
        },
        {
          value: '200-299',
          text: 'Detailed (200-299 words)'
        }
      ]
    });

    this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
  }
}


