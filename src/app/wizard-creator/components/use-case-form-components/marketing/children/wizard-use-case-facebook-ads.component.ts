import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { Validators } from '@angular/forms';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';

@Component({
  selector: 'app-wizard-use-case-facebook-ads',
  templateUrl: `../../use-case-form-base/use-case-form-base.component.html`,
  styles: [
  ]
})
export class WizardUseCaseFacebookAdsComponent extends UseCaseFormBaseComponent {
  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'Business Automation',
      fieldLabel: 'Product/Service Name',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'productServiceName',
      tooltipText: 'Enter the name of your product or service',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'ANT - Creative Solutions is a Full Creative Agency that offer design and development services for small to medium business.',
      fieldLabel: 'Product/Service Description',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(600)],
      inputMaxLen: 600,
      dataName: 'productServiceDescription',
      tooltipText: 'Enter a description for your product or service',
      isLongText: true
    });

    fieldsData.push({
      placeholder: 'E.g: Try it now on https://app.adfluens.io',
      fieldLabel: 'Call to Action',
      fieldValue: '',
      validators: [Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'cta',
      tooltipText: 'Enter the desired Call to Action (CTA)',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'E.g: 10% OFF',
      fieldLabel: 'Promotion',
      fieldValue: '',
      validators: [Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'promotion',
      tooltipText: 'Enter the promotion for the ad',
      isLongText: false
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setCheckboxFieldsData(): void {
    const fields: CheckboxFieldToRenderData[] = [];

    fields.push({
      fieldLabel: 'Suggest Imagery Ideas',
      fieldValue: false,
      dataName: 'suggestImagery'
    })

    this._wizardFormService.updateFormDefaultField_Checkboxes(fields);
  }
}
