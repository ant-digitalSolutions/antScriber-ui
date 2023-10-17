import { OptionField } from "src/app/common/dto/option-field.dto";

/**
 * Contains the different commands the user can use to 
 * generate content from the Wizard Creator
 *
 * @export
 * @enum {number}
 */
export enum WizardCreatorUseCaseGroup {
    AdsAndMarketing = 'Ads and Marketing',
    ArticlesAndBlog = 'Blogging & Articles',
    Coding = 'Coding',
    Ecommerce = 'E-Commerce',
    GeneralWriting = 'General Writing',
    InternalDev = 'Internal Dev',
    Learning = 'Learning',
    SocialMedia = 'Social Media',
    WebsiteCopy = 'Website Copy',
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