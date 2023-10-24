import { WizardFormService } from "src/app/wizard-creator/services/wizard-form.service";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardCreatorCodingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum";
import { CheckboxFieldToRenderData } from "src/app/common/interfaces/checkbox-field-to-render-data";
import { WizardSocialMediaUseCases } from "src/app/wizard-creator/enums/wizard-creator-social-media-use-cases.enum";
import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";

export class UseCase_Social_FacebookPost extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'facebook';
        this.useCaseName = WizardSocialMediaUseCases.FacebookPost;
        this.useCaseGroup = WizardCreatorUseCaseGroup.SocialMedia;
        this.isAvailable = true;
    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: 'E.g. "Sunsets and new beginnings #MondayMotivation"',
            fieldLabel: 'Post Idea',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(600), Validators.minLength(10)],
            inputMaxLen: 600,
            dataName: 'postThemeIdea',
            tooltipText: 'Provide a theme or idea for your Facebook caption. It should resonate with your post and be between 10 to 600 characters.',
            isLongText: true
        });

        this._wizardFormService.updateFormDefaultField_Text(fieldsData);
    }

    override setSelectorFieldsData(): void {
        const fieldsData: SelectorFieldToRenderData[] = [];

        fieldsData.push({
            fieldLabel: 'Words Count',
            fieldValue: '',
            dataName: 'wordsRange',
            tooltipText: 'Choose a word count range for your Instagram caption.',
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
}
