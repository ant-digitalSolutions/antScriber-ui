import { WizardCreatorLearningUseCasesEnum } from "../../enums/wizard-creator-learning-use-cases.enum";
import { UseCaseMeta } from "../../interfaces/use-case-meta.interface";

export const useCaseMeta_Learning: UseCaseMeta[] = [
    {
        iconName: 'default',
        useCaseName: WizardCreatorLearningUseCasesEnum.Explain,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'default',
        useCaseName: WizardCreatorLearningUseCasesEnum.HowTo,
        isAvailableForFreeUsers: true
    },
];