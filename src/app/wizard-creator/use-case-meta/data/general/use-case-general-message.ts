import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardGeneralWritingUseCases } from "src/app/wizard-creator/enums/wizard-creator-general-writing-use-cases.enum";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";

export class UseCase_General_Message extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'sms';
        this.useCaseName = WizardGeneralWritingUseCases.Message;
        this.useCaseGroup = WizardCreatorUseCaseGroup.GeneralWriting;
        this.isAvailable = true;
    }

    defaultTypeOfMessage = 'newMessage';

    override setTextFieldsData(): void {
        const fields: TextFieldToRenderData[] = [];

        fields.push({
            placeholder: 'John Doe',
            fieldLabel: 'Sender\'s Name',
            fieldValue: ``,
            validators: [],
            inputMaxLen: 100,
            dataName: 'senderName',
            tooltipText: 'The name of the person or entity sending the message'
        });

        fields.push({
            placeholder: 'Jane Smith',
            fieldLabel: 'Recipient\'s Name',
            fieldValue: ``,
            validators: [],
            inputMaxLen: 100,
            dataName: 'recipientName',
            tooltipText: 'The name of the person or entity receiving the message'
        });

        fields.push({
            placeholder: 'E.g. "Thank you for your purchase!"',
            fieldLabel: 'Primary Theme/Concept',
            fieldValue: ``,
            validators: [],
            inputMaxLen: 100,
            dataName: 'primaryTheme',
            tooltipText: 'The main theme or concept of the message',
            isLongText: true
        });

        fields.push({
            placeholder: 'When will my order be shipped?',
            fieldLabel: 'Message To Reply',
            fieldValue: ``,
            validators: [],
            inputMaxLen: 1000,
            dataName: 'messageToReply',
            tooltipText: 'The message this is replying to',
            isLongText: true
        });


        this._wizardFormService.updateFormDefaultField_Text(fields);
    }

    override setSelectorFieldsData(): void {
        const fields: SelectorFieldToRenderData[] = [];

        fields.push({
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

        this._wizardFormService.updateFormDefaultField_Selectors(fields);
    }

    override setButtonToggleData(): void {
        const field = {
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
        }

        this._wizardFormService.updateFormDefaultField_ButtonToggle(field);
    }

    override toggleButtonUpdateActions(buttonToggleName: string): void {
        if (buttonToggleName === 'typeOfMessage') {
            const buttonToggleValue = this._wizardFormService.additionalDataFieldValue(buttonToggleName);

            if (buttonToggleValue === 'newMessage') {
                this._wizardFormService.hideFieldFromForm(['messageToReply']);
            }
            if (buttonToggleValue === 'replyMessage') {
                this._wizardFormService.showFieldInForm(['messageToReply']);
            }
        }
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction], 'del');
    }
}
