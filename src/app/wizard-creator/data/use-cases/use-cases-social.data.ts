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

export const useCaseMeta_Social: UseCaseMeta[] = [
    {
        iconName: 'facebook',
        useCaseName: WizardSocialMediaUseCases.FacebookPost,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'instagram',
        useCaseName: WizardSocialMediaUseCases.InstagramCaption,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'linkedin',
        useCaseName: WizardSocialMediaUseCases.LinkedinPost,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'twitter',
        useCaseName: WizardSocialMediaUseCases.TwitterThread,
        isAvailableForFreeUsers: true
    },
    {
        iconName: 'instagram',
        useCaseName: WizardSocialMediaUseCases.InstagramProfileDesc,
        isAvailableForFreeUsers: false
    },
    {
        iconName: 'youtube',
        useCaseName: WizardSocialMediaUseCases.YoutubeDescription,
        isAvailableForFreeUsers: false
    },
    {
        iconName: 'youtube',
        useCaseName: WizardSocialMediaUseCases.YoutubeVideoIdeas,
        isAvailableForFreeUsers: false
    },
    {
        iconName: 'youtube',
        useCaseName: WizardSocialMediaUseCases.YoutubeVideoTitle,
        isAvailableForFreeUsers: false
    },
    {
        iconName: 'hashtag',
        useCaseName: WizardSocialMediaUseCases.HashtagGenerator,
        isAvailableForFreeUsers: false
    },
];