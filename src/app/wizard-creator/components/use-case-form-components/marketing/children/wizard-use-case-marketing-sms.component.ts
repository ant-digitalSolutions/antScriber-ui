import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { Validators } from '@angular/forms';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';

@Component({

  selector: 'app-wizard-use-case-marketing-sms',

  templateUrl: `../../use-case-form-base/use-case-form-base.component.html`,

  styles: [
  ]
})
export class WizardUseCaseMarketingSmsComponent extends UseCaseFormBaseComponent {
  override setTextFieldsData(): void {
    const
      fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g. TechStore Ltd.',
      fieldLabel: 'Business Name',
      fieldValue: '',
      validators: [Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'business_name',
      tooltipText: 'Enter the name of your business',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Jane',
      fieldLabel: 'Recipient Name',
      fieldValue: '',
      validators: [Validators.maxLength(50)],
      inputMaxLen: 50,
      dataName: 'recipient_name',
      tooltipText: 'Enter the name of the recipient',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Tom from TechStore',
      fieldLabel: 'Sender Name',
      fieldValue: '',
      validators: [Validators.maxLength(50)],
      inputMaxLen: 50,
      dataName: 'sender_name',
      tooltipText: 'Enter your name as the sender',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. SuperFast Charger',
      fieldLabel: 'Product/Service Name',
      fieldValue: '',
      validators: [Validators.maxLength(100), Validators.required],
      inputMaxLen: 100,
      dataName: 'product_service_name',
      tooltipText: 'Enter the name of your product or service',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Quick phone charging',
      fieldLabel: 'Problem/Need Addressed',
      fieldValue: '',
      validators: [Validators.maxLength(100), Validators.required],
      inputMaxLen: 100,
      dataName: 'problem_need_addressed',
      tooltipText: 'Describe the problem or need your product or service addresses',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Summer Tech Sale',
      fieldLabel: 'SMS Theme Idea',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(600)],
      inputMaxLen: 600,
      dataName: 'sms_theme_idea',
      tooltipText: 'Enter your idea for the SMS theme',
      isLongText: true
    });

    fieldsData.push({
      placeholder: 'E.g. 10% OFF',
      fieldLabel: 'Promotions',
      fieldValue: '',
      validators: [Validators.maxLength(50)],
      inputMaxLen: 50,
      dataName: 'promotions',
      tooltipText: 'Enter an offer for the client, is any.',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g. Call Now',
      fieldLabel: 'Call to Action Text',
      fieldValue: '',
      validators: [Validators.maxLength(50)],
      inputMaxLen: 50,
      dataName: 'call_to_action_text',
      tooltipText: 'Enter the text for your call to action button',
      isLongText: false
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setSelectorFieldsData(): void {
    const fieldsData: SelectorFieldToRenderData[] = [];

    fieldsData.push({
      fieldLabel: 'Text Length',
      fieldValue: '0-160',
      dataName: 'text_length',
      tooltipText: 'Select the length of the text',
      values: [
        {
          value: '0-160',
          text: '0-160 chars'
        },
        {
          value: '160-320',
          text: '160-320 chars'
        },
        {
          value: '320-450',
          text: '320-450 chars'
        }
      ]
    });

    this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
  }
}
