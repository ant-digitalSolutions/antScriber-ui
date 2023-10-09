import { WizardCreatorCodingUseCasesEnum } from "../../enums/wizard-creator-coding-use-cases.enum";
import { WizardCreatorInternalDevUseCasesEnum } from "../../enums/wizard-creator-internal-dev-use-cases.enum";
import { UseCaseMeta } from "../../interfaces/use-case-meta.interface";

export const useCaseMeta_Coding: UseCaseMeta[] = [
    {
        iconName: 'code',
        useCaseName: WizardCreatorCodingUseCasesEnum.ImplementFunction,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'github',
        useCaseName: WizardCreatorCodingUseCasesEnum.GithubIssue,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'github',
        useCaseName: WizardCreatorCodingUseCasesEnum.GithubMilestone,
        isAvailableForFreeUsers: true
    },
];