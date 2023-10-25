import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { environment } from "src/environments/environment";
import { WizardCreatorWebsiteUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-website-use-cases.enum";

export class UseCase_Website_SectionCopy extends UseCaseMetaAbstract {




    constructor() {
        super();
        this.iconName = 'default';
        this.useCaseName = WizardCreatorWebsiteUseCasesEnum.WebpageSectionCopy;
        this.useCaseGroup = WizardCreatorUseCaseGroup.WebsiteCopy;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: `E.g., ${environment.appName}`,
            fieldLabel: 'Business/Product Name',
            fieldValue: '',
            validators: [Validators.maxLength(50), Validators.required],
            inputMaxLen: 50,
            dataName: 'businessOrProductName',
            tooltipText: 'Provide the name of your business or product. Maximum length: 50 characters.',
            isLongText: false
        });

        fieldsData.push({
            placeholder: 'E.g., Unleash the Power of AI',
            fieldLabel: 'Section Name (Optional)',
            fieldValue: '',
            validators: [Validators.maxLength(100)],
            inputMaxLen: 100,
            dataName: 'sectionName',
            tooltipText: 'Provide the name of the section.',
            isLongText: false
        });

        fieldsData.push({
            placeholder: `E.g., ${environment.appName} is an innovative platform assisting users in crafting high-quality content effortlessly...`,
            fieldLabel: 'Section Description',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(600), Validators.minLength(20)],
            inputMaxLen: 600,
            dataName: 'description',
            tooltipText: 'Provide a detailed description of this webpage section. It should be between 20 to 600 characters.',
            isLongText: true
        });

        fieldsData.push({
            placeholder: `E.g., ${environment.appName}, virtual assistant`,
            fieldLabel: 'Section Keywords',
            fieldValue: '',
            validators: [Validators.maxLength(250)],
            inputMaxLen: 250,
            dataName: 'keywords',
            tooltipText: 'Input relevant keywords for this section, separated by commas. This helps in SEO and searchability.',
            isLongText: false
        });

        fieldsData.push({
            placeholder: 'E.g., Young professionals aged 25-34 interested in tech solutions',
            fieldLabel: 'Target Audience Description',
            fieldValue: '',
            validators: [Validators.maxLength(400)],
            inputMaxLen: 400,
            dataName: 'targetAudience',
            tooltipText: 'Define the primary audience for your content. Describe characteristics or interests to help tailor the output. Max: 150 characters.',
            isLongText: true
        });

        this._wizardFormService.updateFormDefaultField_Text(fieldsData);
    }

    override setButtonToggleData(): void {
        const fieldsData = {
            dataName: 'contentStructure',
            fieldLabel: 'Content Structure',
            fieldValue: 'Paragraph',
            tooltipText: 'Choose the structure of the generated content',
            values: [
                {
                    value: 'Paragraph',
                    text: 'Paragraph'
                },
                {
                    value: 'List',
                    text: 'List'
                },
                {
                    value: 'Sub-Sections',
                    text: 'Sub-Sections'
                }
            ]
        };
        this._wizardFormService.updateFormDefaultField_ButtonToggle(fieldsData);
    }

    override setSelectorFieldsData(): void {
        const fieldsData: SelectorFieldToRenderData[] = [];

        fieldsData.push({
            fieldLabel: 'Desired Word Count',
            fieldValue: 'Brief (0-49 words)',
            dataName: 'wordsCount',
            tooltipText: 'Choose the desired word count range for the section.',
            values: [
                {
                    value: '0-49',
                    text: 'Brief (0-49 words)'
                },
                {
                    value: '50-99',
                    text: 'Short (50-99 words)'
                },
                {
                    value: '100-149',
                    text: 'Moderate (100-149 words)'
                },
                {
                    value: '150-199',
                    text: 'Lengthy (150-199 words)'
                },
                {
                    value: '200-299',
                    text: 'Detailed (200-299 words)'
                }
            ]
        });

        this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction, WizardDefaultFieldNamesEnum.AmountOfVariants], 'del');
    }
}
