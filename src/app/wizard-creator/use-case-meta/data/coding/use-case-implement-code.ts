import { WizardFormService } from "src/app/wizard-creator/services/wizard-form.service";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardCreatorCodingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum";
import { CheckboxFieldToRenderData } from "src/app/common/interfaces/checkbox-field-to-render-data";

export class UseCase_Coding_ImplementCode extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'code';
        this.useCaseName = WizardCreatorCodingUseCasesEnum.ImplementFunction;
        this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fields: TextFieldToRenderData[] = [];

        fields.push({
            placeholder: 'The specific programming language for the code. [E.g., "Python"]',
            fieldLabel: 'Programming Lang',
            fieldValue: '',
            validators: [Validators.required(), Validators.maxLength(20)],
            inputMaxLen: 20,
            dataName: 'programmingLang'
        })

        fields.push({
            placeholder: 'If any, specific framework is to be used. [E.g., "Django"]',
            fieldLabel: 'Framework',
            fieldValue: '',
            validators: [Validators.maxLength(20)],
            inputMaxLen: 20,
            dataName: 'framework'
        })

        fields.push({
            placeholder: 'E.g., "Generate a function that sorts an array in descending order"',
            fieldLabel: 'Instruction',
            fieldValue: '',
            validators: [Validators.required(), Validators.minLength(10), Validators.maxLength(800)],
            inputMaxLen: 800,
            dataName: 'instruction',
            isLongText: true
        });

        fields.push({
            placeholder: 'Any pre-existing code that needs to be incorporated or considered.',
            fieldLabel: 'Additional Code',
            fieldValue: '',
            validators: [Validators.maxLength(4000)],
            inputMaxLen: 4000,
            dataName: 'additionalCode',
            isLongText: true
        })




        this._wizardFormService.updateFormDefaultField_Text(fields);
    }

    override setCheckboxFieldsData(): void {
        const fields: CheckboxFieldToRenderData[] = [];

        fields.push({
            fieldLabel: 'Explain code',
            fieldValue: false,
            dataName: 'explainCode'
        })

        this._wizardFormService.updateFormDefaultField_Checkboxes(fields);
    }
}
