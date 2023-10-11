import { WizardCreatorLearningUseCasesEnum } from "../../enums/wizard-creator-learning-use-cases.enum";
import { WizardCreatorWebsiteUseCasesEnum } from "../../enums/wizard-creator-website-use-cases.enum";
import { UseCaseMeta } from "../../interfaces/use-case-meta.interface";

export const useCaseMeta_Websites: UseCaseMeta[] = [
    {
        iconName: 'default',
        useCaseName: WizardCreatorWebsiteUseCasesEnum.WebpageSectionCopy,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'default',
        useCaseName: WizardCreatorWebsiteUseCasesEnum.WebpageOutline,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'default',
        useCaseName: WizardCreatorWebsiteUseCasesEnum.WebpageHeadlines,
        isAvailableForFreeUsers: true
    },
];