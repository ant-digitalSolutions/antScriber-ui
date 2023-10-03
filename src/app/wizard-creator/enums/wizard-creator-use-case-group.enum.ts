import { OptionField } from "src/app/common/dto/option-field.dto";

/**
 * Contains the different commands the user can use to 
 * generate content from the Wizard Creator
 *
 * @export
 * @enum {number}
 */
export enum WizardCreatorUseCaseGroup {
    GeneralWriting = 'General Writing',
    InternalDev = 'Internal Dev', // contains use cases that will be used for us for internal porpuses. Remove when prod
    Coding = 'Coding',
    Learning = 'Learning',
   SocialMedia = 'Social Media',
   ArticlesAndBlog = 'Blogging & Articles',
   Ecommerce = 'E-Commerce',
   AdsAndMarketing = 'Ads and Marketing',
  
   Business = 'Business',
   Design = 'Design',
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