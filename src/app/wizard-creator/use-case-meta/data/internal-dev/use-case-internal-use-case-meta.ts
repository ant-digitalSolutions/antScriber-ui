import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorInternalDevUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-internal-dev-use-cases.enum";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";

export class UseCase_Internal_UseCaseMeta extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'default';
        this.useCaseName = WizardCreatorInternalDevUseCasesEnum.UseCaseCustomComponent;
        this.useCaseGroup = WizardCreatorUseCaseGroup.InternalDev;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fields: TextFieldToRenderData[] = [];

        fields.push({
            placeholder: 'E.g: customInstruction: Custom instruction from the user',
            fieldLabel: 'Text Field Data',
            fieldValue: ``,
            validators: [],
            inputMaxLen: 1000,
            dataName: 'dataToGenerate',
            tooltipText: 'Contains the definition of the fields of type text',
            isLongText: true
        });

        this._wizardFormService.updateFormDefaultField_Text(fields);
    }

    override setButtonToggleData(): void {
        const field = {
            dataName: 'typeOfData',
            fieldLabel: 'Type Of Data',
            fieldValue: 'textFields',
            tooltipText: 'Select the type of data to generate. This is the final method to be generated',
            values: [
                {
                    value: 'textFields',
                    text: 'Text Fields'
                },
                {
                    value: 'selectorFields',
                    text: 'Selector Fields'
                },
                {
                    value: 'buttonToggleFields',
                    text: 'Button Toggle'
                }
            ]
        }

        this._wizardFormService.updateFormDefaultField_ButtonToggle(field);
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction,
            WizardDefaultFieldNamesEnum.AmountOfVariants,
            WizardDefaultFieldNamesEnum.OutputLang,
            WizardDefaultFieldNamesEnum.VoiceTone], 'del');
    }
}
