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
    Learning = 'Learning',
    AdsAndMarketing = 'Ads and Marketing',
    Coding = 'Coding',
    WebsiteCopy = 'Website Copy',
    ArticlesAndBlog = 'Blogging & Articles',
    Ecommerce = 'E-Commerce',
    GeneralWriting = 'General Writing',
    InternalDev = 'Internal Dev',
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