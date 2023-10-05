import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';

@Component({
  selector: 'app-wizard-use-case-email',
  templateUrl: `../../use-case-form-base/use-case-form-base.component.html`,
  styles: [
  ]
})
export class WizardUseCaseEmailComponent extends UseCaseFormBaseComponent {
  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g. John Doe',
      fieldLabel: 'Recipient Name',
      fieldValue: '',
      validators: [],
      inputMaxLen: 50,
      dataName: 'recipient_name',
      tooltipText: 'Enter the name of the recipient',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Jane Smith',
      fieldLabel: 'Sender Name',
      fieldValue: '',
      validators: [],
      inputMaxLen: 50,
      dataName: 'sender_name',
      tooltipText: 'Enter your name as the sender',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Tech Innovators Ltd.',
      fieldLabel: 'Business Name',
      fieldValue: '',
      validators: [],
      inputMaxLen: 100,
      dataName: 'business_name',
      tooltipText: 'Enter the name of your business',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Premium Laptop',
      fieldLabel: 'Product/Service Name',
      fieldValue: '',
      validators: [],
      inputMaxLen: 100,
      dataName: 'product_service_name',
      tooltipText: 'Enter the name of your product/service',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Eco-friendly tech',
      fieldLabel: 'Keyword/Topic',
      fieldValue: '',
      validators: [],
      inputMaxLen: 50,
      dataName: 'keyword_topic',
      tooltipText: 'Enter a keyword or topic relevant to your ad',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Fast-charging solution',
      fieldLabel: 'Problem/Need Addressed',
      fieldValue: '',
      validators: [],
      inputMaxLen: 100,
      dataName: 'problem_need_addressed',
      tooltipText: 'Enter the problem or need that your product/service addresses',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Sign up for a trial',
      fieldLabel: 'Desired Action',
      fieldValue: '',
      validators: [],
      inputMaxLen: 100,
      dataName: 'desired_action',
      tooltipText: 'Enter the desired action you want users to take',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Click here for 20% off!',
      fieldLabel: 'Call to Action Text',
      fieldValue: '',
      validators: [],
      inputMaxLen: 50,
      dataName: 'call_to_action_text',
      tooltipText: 'Enter the text for your call to action button',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Summer Sale Bonanza',
      fieldLabel: 'Email Theme Idea',
      fieldValue: '',
      validators: [],
      inputMaxLen: 100,
      dataName: 'email_theme_idea',
      tooltipText: 'Enter an idea for the theme of your email',
      isLongText: true
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setSelectorFieldsData(): void {
    const fields: SelectorFieldToRenderData[] = [];

    fields.push({
      fieldLabel: 'Words Range',
      fieldValue: '0-100',
      dataName: 'wordsRange',
      tooltipText: 'Select the desired word count range for the message',
      values: [
        {
          value: '0-50',
          text: '0-50 words (Brief)'
        },
        {
          value: '50-150',
          text: '50-150 words (Short)'
        },
        {
          value: '150-300',
          text: '150-300 words (Medium)'
        },
        {
          value: '300-500',
          text: '300-500 words (Detailed)'
        },
        {
          value: '500-750',
          text: '500-750 words (In-depth)'
        },
        {
          value: '750+',
          text: '750+ words (Extensive)'
        }
      ]
    });

    this._wizardFormService.updateFormDefaultField_Selectors(fields);
  }
}
