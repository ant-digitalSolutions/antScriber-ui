import { Component } from '@angular/core';
import { Validators } from 'ngx-editor';
import { Subject, takeUntil } from 'rxjs';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-use-case-general-writing-form-message',
  templateUrl: './wizard-use-case-general-writing-form-message.component.html',
  styleUrls: ['./wizard-use-case-general-writing-form-message.component.scss']
})
export class WizardUseCaseGeneralWritingFormMessageComponent {
  textFields: TextFieldToRenderData[];
  checkboxFields: CheckboxFieldToRenderData[];
  selectorFields: SelectorFieldToRenderData[];

  componentDestroyed$: Subject<boolean> = new Subject();

  defaultTypeOfMessage = 'newMessage';

  /**
   *
   *
   * @type {('replyTo' | 'newMessage')}
   * @memberof WizardUseCaseCodingGithubIssueComponent
   */
  selectedMessageType: string = this.defaultTypeOfMessage;

  constructor(
    private _wizard: WizardCreatorService,
    private _wizardForm: WizardFormService) { }


  ngOnInit(): void {
    this._wizardForm.updateFieldsForGeneralWriting();
    this._wizardForm.cleanData();
    this.setNeededFields();
    this.setListeners();
  }

  ngOnDestroy(): void {
    this._wizardForm.restoreDefaultFields();
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete();
    this._wizardForm.cleanData();
  }

  setNeededFields() {
    this.textFields = [];
    this.checkboxFields = [];
    this.selectorFields = [];

    this._wizardForm.updateAdditionalData('isReply', this.defaultTypeOfMessage === 'newMessage' ? false : true);

    this.textFields.push({
      placeholder: 'John Doe',
      fieldLabel: 'Sender\'s Name',
      fieldValue: ``,
      validators: [],
      inputMaxLen: 100,
      dataName: 'senderName',
      tooltipText: 'The name of the person or entity sending the message'
    });

    this.textFields.push({
      placeholder: 'Jane Smith',
      fieldLabel: 'Recipient\'s Name',
      fieldValue: ``,
      validators: [],
      inputMaxLen: 100,
      dataName: 'recipientName',
      tooltipText: 'The name of the person or entity receiving the message'
    });

    this.textFields.push({
      placeholder: 'E.g. "Thank you for your purchase!"',
      fieldLabel: 'Primary Theme/Concept',
      fieldValue: ``,
      validators: [],
      inputMaxLen: 100,
      dataName: 'primaryTheme',
      tooltipText: 'The main theme or concept of the message',
      isLongText: true
    });

      this.textFields.push({
        placeholder: 'When will my order be shipped?',
        fieldLabel: 'Message To Reply',
        fieldValue: ``,
        validators: [],
        inputMaxLen: 1000,
        dataName: 'messageToReply',
        tooltipText: 'The message this is replying to',
        isLongText: true
      });

    this.selectorFields.push({
      fieldLabel: 'Words Range',
      fieldValue: '0-50',
      dataName: 'wordsRange',
      tooltipText: 'Select the desired word count range for the message',
      values: [
        {
          value: '0-25',
          text: '0-25 words'
        },
        {
          value: '25-50',
          text: '25-50 words'
        },
        {
          value: '50-100',
          text: '50-100 words'
        },
        {
          value: '100-150',
          text: '100-150 words'
        },
        {
          value: '150-300',
          text: '150-300 words'
        }
        ,
        {
          value: '300+',
          text: '300+ words'
        }
      ]
    });

    this.selectorFields.push({
      dataName: 'typeOfMessage',
      fieldLabel: 'Type of Message',
      fieldValue: this.defaultTypeOfMessage,
      tooltipText: 'Select the type of issue you want to create.',
      values: [
        {
          value: 'newMessage',
          text: 'New Message'
        },
        {
          value: 'replyMessage',
          text: 'Reply Message'
        }
      ]
    })
  }

  setListeners() {
    this._wizardForm.buttonToggleUpdate$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(buttonToggleName => {
        if (buttonToggleName === 'typeOfMessage') {
          const selectedTypeOfIssue = this._wizardForm.additionalDataFieldValue(buttonToggleName);
          this.setFieldsToRender(selectedTypeOfIssue);
        }
      })
  }

  setFieldsToRender(selectedTypeOfIssue: string): void {
    this.selectedMessageType = selectedTypeOfIssue;

    if (selectedTypeOfIssue === 'newMessage') {
      this._wizardForm.updateAdditionalData('isReply', false);
    } else {
      this._wizardForm.updateAdditionalData('isReply', true);

    }
  }



  textFieldData(dataName: string): TextFieldToRenderData {
    const data = this.textFields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  selectorData(dataName: string): SelectorFieldToRenderData {
    const data = this.selectorFields.find(d => d.dataName === dataName);

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
