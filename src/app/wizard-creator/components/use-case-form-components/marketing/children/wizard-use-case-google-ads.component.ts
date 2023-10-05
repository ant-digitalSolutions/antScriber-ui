import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { Validators } from '@angular/forms';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';

@Component({
  selector: 'app-wizard-use-case-google-ads',
  templateUrl: `../../use-case-form-base/use-case-form-base.component.html`,
  styles: [
  ]
})
export class WizardUseCaseGoogleAdsTitleComponent extends UseCaseFormBaseComponent {


  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'Enter company name',
      fieldLabel: 'Company Name',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'companyName',
      tooltipText: 'Enter the name of the company',
      isLongText: false
    });

    fieldsData.push({
      placeholder: 'Enter product description',
      fieldLabel: 'Product/Service Description',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(600)],
      inputMaxLen: 600,
      dataName: 'productDescription',
      tooltipText: 'Enter a short description of the product or service',
      isLongText: true
    });

    fieldsData.push({
      placeholder: 'scribe, marketing, ...',
      fieldLabel: 'Keywords',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(100)],
      inputMaxLen: 100,
      dataName: 'keywords',
      tooltipText: 'Enter keywords separated by comma',
      isLongText: false
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setButtonToggleData(): void {
    // Create SelectorFieldToRenderData object for contentType field
    const contentTypeData = {
      dataName: 'contentType',
      fieldLabel: 'Content Type',
      fieldValue: 'title',
      tooltipText: 'Select the Google Ad content type.',
      values: [
        {
          value: 'title',
          text: 'Title'
        },
        {
          value: 'description',
          text: 'Description'
        }
      ]
    };

    // Insert contentTypeData into fieldsData list
    this._wizardFormService.updateFormDefaultField_ButtonToggle(contentTypeData);
  }
}
