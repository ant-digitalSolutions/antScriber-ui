import { WizardCreatorMarketingUseCasesEnum } from "../../enums/wizard-creator-marketing-use-cases.enum";
import { WizardSocialMediaUseCases } from "../../enums/wizard-creator-social-media-use-cases.enum";
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

export const useCaseMeta_Marketing: UseCaseMeta[] = [
    {
        iconName: 'facebook',
        useCaseName: WizardCreatorMarketingUseCasesEnum.FacebookAds,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'google',
        useCaseName: WizardCreatorMarketingUseCasesEnum.GoogleAd,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'linkedin',
        useCaseName: WizardCreatorMarketingUseCasesEnum.LinkedinAds,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'email',
        useCaseName: WizardCreatorMarketingUseCasesEnum.EmailMarketing,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'sms',
        useCaseName: WizardCreatorMarketingUseCasesEnum.SmsMarketing,
        isAvailableForFreeUsers: true
    },
];