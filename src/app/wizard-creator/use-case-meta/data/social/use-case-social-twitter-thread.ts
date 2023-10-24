import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardSocialMediaUseCases } from "src/app/wizard-creator/enums/wizard-creator-social-media-use-cases.enum";
import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";

export class UseCase_Social_TwitterThread extends UseCaseMetaAbstract {




    constructor() {
        // this.useCaseName = WizardCreatorCodingUseCasesEnum.GithubIssue;
        // this.useCaseGroup = WizardCreatorUseCaseGroup.Coding;
        super();
        this.iconName = 'twitter';
        this.useCaseName = WizardSocialMediaUseCases.TwitterThread;
        this.useCaseGroup = WizardCreatorUseCaseGroup.SocialMedia;
        this.isAvailable = true;

    }

    override setTextFieldsData(): void {
        const fieldsData: TextFieldToRenderData[] = [];

        fieldsData.push({
            placeholder: 'E.g. "Diving into the latest tech trends of 2023! 🚀 #TechTuesday"',
            fieldLabel: 'Tweet Idea',
            fieldValue: '',
            validators: [Validators.required, Validators.maxLength(600), Validators.minLength(10)],
            inputMaxLen: 600,
            dataName: 'threadThemeIdea',
            tooltipText: 'Suggest a theme or draft for your tweet.',
            isLongText: true
        });

        this._wizardFormService.updateFormDefaultField_Text(fieldsData);
    }

    override setSelectorFieldsData(): void {
        const fieldsData: SelectorFieldToRenderData[] = [];

        fieldsData.push({
            fieldLabel: 'Number of Tweets',
            fieldValue: '',
            dataName: 'tweetCount',
            tooltipText: 'Choose how many tweets you want in your thread. Threads can help convey longer narratives or points across multiple tweets.',
            values: [
                {
                    value: '1',
                    text: '1 Tweet'
                },
                {
                    value: '2',
                    text: '2 Tweets'
                },
                {
                    value: '3',
                    text: '3 Tweets'
                },
                {
                    value: '4',
                    text: '4 Tweets'
                },
                {
                    value: '5',
                    text: '5 Tweets'
                }
            ]
        });

        this._wizardFormService.updateFormDefaultField_Selectors(fieldsData);
    }
}
