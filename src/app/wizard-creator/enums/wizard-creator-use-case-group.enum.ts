import { OptionField } from "src/app/common/dto/option-field.dto";

/**
 * Contains the different commands the user can use to 
 * generate content from the Wizard Creator
 *
 * @export
 * @enum {number}
 */
export enum WizardCreatorUseCaseGroup {
    SocialMedia = 'Social Media',
    AdsAndMarketing = 'Ads and Marketing',
    Learning = 'Learning',
    WebsiteCopy = 'Website Copy',
    Coding = 'Coding',
    InternalDev = 'Internal Dev', // contains use cases that will be used for us for internal porpuses. Remove when prod
    GeneralWriting = 'General Writing',
   ArticlesAndBlog = 'Blogging & Articles',
   Ecommerce = 'E-Commerce',
//    Business = 'Business',
//    Design = 'Design',
}

export function wizardCreatorUseCaseGroupList(): string[] {
    return Object.values(WizardCreatorUseCaseGroup);
}

export function wizardCreatorUseCaseGroupEnumOptionFields(): OptionField<string>[] {
    return Object.values(WizardCreatorUseCaseGroup).map(v => {
        return {
            value: v,
            text: v
        }
    });
}