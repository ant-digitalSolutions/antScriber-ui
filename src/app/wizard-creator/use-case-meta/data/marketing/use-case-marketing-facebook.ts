import { Validators } from "ngx-editor";
import { CheckboxFieldToRenderData } from "src/app/common/interfaces/checkbox-field-to-render-data";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorMarketingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-marketing-use-cases.enum";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";

export class UseCase_Marketing_Facebook extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'facebook';
        this.useCaseName = WizardCreatorMarketingUseCasesEnum.FacebookAds;
        this.useCaseGroup = WizardCreatorUseCaseGroup.AdsAndMarketing;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: 'E.g: Adfluens',
            fieldLabel: 'Product/Service Name',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(100)],
            inputMaxLen: 100,
            dataName: 'productServiceName',
            tooltipText: 'Enter the name of your product or service',
            isLongText: false
        });

        fieldsData.push({
            placeholder: 'E.g: Adfluens is an AI-powered tool that any professional can use as a creative assistant',
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

        // fields.push({
        //     fieldLabel: 'Suggest Imagery Ideas',
        //     fieldValue: false,
        //     dataName: 'suggestImagery'
        // })

        this._wizardFormService.updateFormDefaultField_Checkboxes(fields);
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction], 'del');
    }
}
