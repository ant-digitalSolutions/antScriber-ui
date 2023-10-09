import { WizardGeneralWritingUseCases } from "../../enums/wizard-creator-general-writing-use-cases.enum";
import { UseCaseMeta } from "../../interfaces/use-case-meta.interface";

// export let useCaseSocialMediaData:UseCaseMeta[] = [
//     {
//         iconName:'facebook',
//         useCaseName: WizardSocialMediaUseCases.FacebookPost,
//         isAvailableForFreeUsers: true
//     },
//     {
//         iconName: 'instagram',
//         useCaseName: WizardSocialMediaUseCases.InstagramCaption,
//         isAvailableForFreeUsers: true
//     },

// ]

export const useCaseMeta_GeneralWriting: UseCaseMeta[] = [
    {
        iconName: 'email',
        useCaseName: WizardGeneralWritingUseCases.Email,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'letter',
        useCaseName: WizardGeneralWritingUseCases.CoverLetter,
        isAvailableForFreeUsers: true
    },
];