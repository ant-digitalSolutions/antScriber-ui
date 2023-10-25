import { WizardFormService } from "src/app/wizard-creator/services/wizard-form.service";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardCreatorCodingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum";
import { CheckboxFieldToRenderData } from "src/app/common/interfaces/checkbox-field-to-render-data";
import { WizardSocialMediaUseCases } from "src/app/wizard-creator/enums/wizard-creator-social-media-use-cases.enum";
import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { WizardCreatorMarketingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-marketing-use-cases.enum";

export class UseCase_Marketing_GoogleAds extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'google';
        this.useCaseName = WizardCreatorMarketingUseCasesEnum.GoogleAd;
        this.useCaseGroup = WizardCreatorUseCaseGroup.AdsAndMarketing;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: 'E.g: Adfluens',
            fieldLabel: 'Company/Product/Service Name',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(100)],
            inputMaxLen: 100,
            dataName: 'companyName',
            tooltipText: 'Enter the name of the company, product or service',
            isLongText: false
        });

        fieldsData.push({
            placeholder: 'E.g: AI-Powered creative assistant that can help boost your productivity',
            fieldLabel: 'Product/Service Description',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(600)],
            inputMaxLen: 600,
            dataName: 'productDescription',
            tooltipText: 'Enter a short description of the product or service',
            isLongText: true
        });

        fieldsData.push({
            placeholder: 'adfluens, marketing, content generator, virtual assistant ...',
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

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction], 'del');
    }
}
