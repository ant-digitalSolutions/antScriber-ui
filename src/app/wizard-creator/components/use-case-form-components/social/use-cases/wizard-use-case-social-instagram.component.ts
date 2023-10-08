import { Component } from '@angular/core';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { Validators } from '@angular/forms';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';

@Component({
  selector: 'app-wizard-use-case-social-instagram',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styles: [
  ]
})
export class WizardUseCaseSocialInstagramComponent extends UseCaseFormBaseComponent {

  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g. "Sunsets and new beginnings #MondayMotivation"',
      fieldLabel: 'Instagram Caption Theme',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(600), Validators.minLength(10)],
      inputMaxLen: 600,
      dataName: 'postThemeIdea',
      tooltipText: 'Provide a theme or idea for your Instagram caption. It should resonate with your post and be between 10 to 600 characters.',
      isLongText: true
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setSelectorFieldsData(): void {
    const fieldsData: SelectorFieldToRenderData[] = [];

    fieldsData.push({
      fieldLabel: 'Words Count',
      fieldValue: '',
      dataName: 'wordsRange',
      tooltipText: 'Choose a word count range for your Instagram caption. Depending on the content and context, select the length that best tells your story.',
      values: [
        {
          value: '0-30 words',
          text: 'Very Brief (0-30 words)'
        },
        {
          value: '30-60 words',
          text: 'Brief (30-60 words)'
        },
        {
          value: '60-90 words',
          text: 'Moderate (60-90 words)'
        },
        {
          value: '90-120 words',
          text: 'Long (90-120 words)'
        },
        {
          value: '120-150 words',
          text: 'Very Long (120-150 words)'
        }
      ]
    });

    this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
  }
}
