import { Component } from '@angular/core';
import { Validators } from 'ngx-editor';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { UseCaseFormBaseComponent } from '../../use-case-form-base/use-case-form-base.component';

@Component({
  selector: 'app-wizard-use-case-social-tweet',
  templateUrl: '../../use-case-form-base/use-case-form-base.component.html',
  styles: [
  ]
})
export class WizardUseCaseSocialTweetComponent extends UseCaseFormBaseComponent {
  override setTextFieldsData(): void {
    const fieldsData: TextFieldToRenderData[] = [];

    fieldsData.push({
      placeholder: 'E.g. "Diving into the latest tech trends of 2023! 🚀 #TechTuesday"',
      fieldLabel: 'Tweet Idea',
      fieldValue: '',
      validators: [Validators.required, Validators.maxLength(280), Validators.minLength(10)],
      inputMaxLen: 280,
      dataName: 'threadThemeIdea',
      tooltipText: 'Suggest a theme or draft for your tweet. Remember, tweets are most impactful when concise and engaging, so aim for 10 to 280 characters.',
      isLongText: true
    });

    this._wizardFormService.updateFormDefaultField_Text(fieldsData);
  }

  override setSelectorFieldsData(): void {
    const fieldsData: SelectorFieldToRenderData[] = [];

    fieldsData.push({
      fieldLabel: 'Number of Tweets',
      fieldValue: '',
      dataName: 'tweetCount',
      tooltipText: 'Choose how many tweets you want in your thread. Threads can help convey longer narratives or points across multiple tweets.',
      values: [
        {
          value: '1',
          text: '1 Tweet'
        },
        {
          value: '2',
          text: '2 Tweets'
        },
        {
          value: '3',
          text: '3 Tweets'
        },
        {
          value: '4',
          text: '4 Tweets'
        },
        {
          value: '5',
          text: '5 Tweets'
        }
      ]
    });

    this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
  }
}
