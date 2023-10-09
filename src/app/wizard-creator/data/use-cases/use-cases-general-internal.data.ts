import { WizardCreatorInternalDevUseCasesEnum } from "../../enums/wizard-creator-internal-dev-use-cases.enum";
import { UseCaseMeta } from "../../interfaces/use-case-meta.interface";

export const useCaseMeta_Internal: UseCaseMeta[] = [
    {
        iconName: 'default',
        useCaseName: WizardCreatorInternalDevUseCasesEnum.UseCaseCustomComponent,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'default',
        useCaseName: WizardCreatorInternalDevUseCasesEnum.UseCasePromptGenerator,
        isAvailableForFreeUsers: true
    },
];