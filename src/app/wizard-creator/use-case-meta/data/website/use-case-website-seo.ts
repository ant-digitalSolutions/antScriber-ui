import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardCreatorWebsiteUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-website-use-cases.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { environment } from "src/environments/environment";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";

export class UseCase_Website_SEO extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'default';
        this.useCaseName = WizardCreatorWebsiteUseCasesEnum.SEO;
        this.useCaseGroup = WizardCreatorUseCaseGroup.WebsiteCopy;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: 'E.g., "About Us"',
            fieldLabel: 'Name of Webpage',
            fieldValue: '',
            validators: [Validators.maxLength(50), Validators.required],
            inputMaxLen: 50,
            dataName: 'webpageName',
            tooltipText: `Enter the name of the webpage you're showcasing.`,
            isLongText: false
        });

        fieldsData.push({
            placeholder: `E.g., "${environment.appName}"`,
            fieldLabel: 'Name of Business/Product (Optional)',
            fieldValue: '',
            validators: [Validators.maxLength(50)],
            inputMaxLen: 50,
            dataName: 'businessOrProductName',
            tooltipText: `Enter the name of the webpage, business or the specific product you're showcasing.Keep it within 50 characters.`,
            isLongText: false
        });

        fieldsData.push({
            placeholder: `E.g., "${environment.appName} assists in generating high-quality content effortlessly for businesses..."`,
            fieldLabel: 'Webpage Description',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(600), Validators.minLength(20)],
            inputMaxLen: 600,
            dataName: 'description',
            tooltipText: 'Describe the essence of this webpage. Aim for a length between 20 and 600 characters.',
            isLongText: true
        });

        fieldsData.push({
            placeholder: `E.g., "${environment.appName}, content generation, AI writing"`,
            fieldLabel: 'Keywords (Optional)',
            fieldValue: '',
            validators: [Validators.maxLength(100)],
            inputMaxLen: 100,
            dataName: 'keywords',
            tooltipText: 'List relevant keywords that represent the webpage. Use commas to separate them. Keywords improve SEO and webpage visibility.',
            isLongText: false
        });

        fieldsData.push({
            placeholder: 'E.g., "Marketing Agencies seeking automated content tools"',
            fieldLabel: 'Target Audience Insights (Optional)',
            fieldValue: '',
            validators: [Validators.maxLength(150)],
            inputMaxLen: 150,
            dataName: 'targetAudience',
            tooltipText: 'Who are you targeting? Describe their attributes or preferences. This helps in refining the content appeal.',
            isLongText: false
        });

        this._wizardFormService.updateFormDefaultField_Text(fieldsData);
    }

    override setButtonToggleData(): void {
        const fieldsData = {
            dataName: 'typeOfContent',
            fieldLabel: 'Content Type',
            fieldValue: 'MetaDescription',
            tooltipText: 'Select the type of content.',
            values: [
                {
                    value: 'MetaDescription',
                    text: 'Meta Description'
                },
                {
                    value: 'Excerpt',
                    text: 'Excerpt'
                },
                {
                    value: 'MetaTags',
                    text: 'Meta Tags'
                }
            ]
        }
        this._wizardFormService.updateFormDefaultField_ButtonToggle(fieldsData);
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction, WizardDefaultFieldNamesEnum.VoiceTone], 'del');
    }
}
