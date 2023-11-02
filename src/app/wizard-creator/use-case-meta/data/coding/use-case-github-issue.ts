import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorCodingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";

export class UseCaseGitHubIssue extends UseCaseMetaAbstract {

    defaultTypeOfIssue = 'featureRequest';




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'code';
        this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        this.isAvailable = true;
    }

    override toggleButtonUpdateActions(buttonToggleName: string): void {
        if (buttonToggleName === 'typeOfIssue') {
            const selectedTypeOfIssue = this._wizardFormService.additionalDataFieldValue(buttonToggleName);

            if (selectedTypeOfIssue === 'featureRequest') {
                this._wizardFormService.hideFieldFromForm(['bugDescription', 'bugSolution']);
                this._wizardFormService.showFieldInForm(['featureDescription'])
            }
            if (selectedTypeOfIssue === 'bugReport') {
                this._wizardFormService.showFieldInForm(['bugDescription', 'bugSolution']);
                this._wizardFormService.hideFieldFromForm(['featureDescription'])
            }
        }
    }

    override setTextFieldsData(): void {
        const fields: TextFieldToRenderData[] = [];
        fields.push({
            placeholder: 'Application crashes when clicking on Settings...',
            fieldLabel: 'Bug Description',
            fieldValue: '',
            validators: [Validators.maxLength(1000)],
            inputMaxLen: 1000,
            dataName: 'bugDescription',
            tooltipText: 'Detailed description of the encountered bug',
            isLongText: true
        })

        fields.push({
            placeholder: 'Add a dark mode option...',
            fieldLabel: 'Feature Description',
            fieldValue: '',
            validators: [Validators.maxLength(1000)],
            inputMaxLen: 1000,
            dataName: 'featureDescription',
            tooltipText: 'Description of the feature being requested.',
            isLongText: true
        })


        fields.push({
            placeholder: 'Avoid null reference when fetching user settings',
            fieldLabel: 'Bug Solution',
            fieldValue: '',
            validators: [Validators.maxLength(1000)],
            inputMaxLen: 1000,
            dataName: 'bugSolution',
            tooltipText: 'If known, a suggested solution or workaround for the bug.',
            isLongText: true
        })

        this._wizardFormService.updateFormDefaultField_Text(fields);
    }

    override setButtonToggleData(): void {
        const field = {
            dataName: 'typeOfIssue',
            fieldLabel: 'Type of Issue',
            fieldValue: this.defaultTypeOfIssue,
            tooltipText: 'Select the type of issue you want to create.',
            values: [
                {
                    value: 'bugReport',
                    text: 'Bug Report'
                },
                {
                    value: 'featureRequest',
                    text: 'Feature Request'
                }
            ]
        }

        this._wizardFormService.updateFormDefaultField_ButtonToggle(field);
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.GtpVersion,
            WizardDefaultFieldNamesEnum.ImaginationSelector
        ], 'add');
    }
}
