import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardSocialMediaUseCases } from "src/app/wizard-creator/enums/wizard-creator-social-media-use-cases.enum";
import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";

export class UseCase_Social_LinkedinPost extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'linkedin';
        this.useCaseName = WizardSocialMediaUseCases.LinkedinPost;
        this.useCaseGroup = WizardCreatorUseCaseGroup.SocialMedia;
        this.isAvailable = true;

    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: 'E.g. "Exploring the latest trends in AI for Healthcare. Excited for the upcoming conference! #AIInHealthcare"',
            fieldLabel: 'LinkedIn Post Theme',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(600), Validators.minLength(10)],
            inputMaxLen: 600,
            dataName: 'postThemeIdea',
            tooltipText: `Provide a central theme or idea for your LinkedIn post. Ensure it's relevant to your professional audience and is between 10 to 600 characters.`,
            isLongText: true
        });

        fieldsData.push({
            placeholder: 'E.g. "Marketing Professionals, Tech Enthusiasts, CEOs"',
            fieldLabel: 'LinkedIn Post Target Audience',
            fieldValue: '',
            validators: [Validators.maxLength(100)],
            inputMaxLen: 100,
            dataName: 'targetAudience',
            tooltipText: 'Identify the specific groups or roles you aim to reach with this LinkedIn post. This helps in tailoring the content effectively.',
            isLongText: false
        });

        fieldsData.push({
            placeholder: 'E.g. "@JohnDoe, @TechInsights, @JaneSmith"',
            fieldLabel: 'Mentioned LinkedIn Profiles',
            fieldValue: '',
            validators: [Validators.maxLength(100)],
            inputMaxLen: 100,
            dataName: 'relatedProfiles',
            tooltipText: 'List LinkedIn profiles or company pages you want to mention or highlight in your post.',
            isLongText: false
        });


        this._wizardFormService.updateFormDefaultField_Text(fieldsData);
    }

    override setSelectorFieldsData(): void {
        const fieldsData: SelectorFieldToRenderData[] = [];

        fieldsData.push({
            fieldLabel: 'Words Count',
            fieldValue: '',
            dataName: 'wordsRange',
            tooltipText: 'Choose a word count range for your Linkedin Post.',
            values: [
                {
                    value: '0-30 words',
                    text: 'Very Brief (0-30 words)'
                },
                {
                    value: '30-60 words',
                    text: 'Brief (30-60 words)'
                },
                {
                    value: '60-90 words',
                    text: 'Moderate (60-90 words)'
                },
                {
                    value: '90-120 words',
                    text: 'Long (90-120 words)'
                },
                {
                    value: '120-150 words',
                    text: 'Very Long (120-150 words)'
                }
            ]
        });

        this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
    }

    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.Instruction], 'del');
    }
}
