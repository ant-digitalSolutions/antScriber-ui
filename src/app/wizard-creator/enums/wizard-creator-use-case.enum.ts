import { OptionField } from "src/app/common/dto/option-field.dto";

/**
 * Contains the different commands the user can use to 
 * generate content from the Wizard Creator
 *
 * @export
 * @enum {number}
 */
export enum WizardCreatorUseCase {
    CTA = 'Call To Action',
    BrandName = 'Brand Name',
    BusinessIdeaPitch = 'Business Idea Pitch',
    WriterFramewordAIDA = 'Writer Framework AIDA',
    WriterFrameworkPAS = 'Writer Framework PAS',
    CoverLetter = 'Cover Letter',
    Email = 'Email',
    GoogleSearchAd = 'Google Search Ad',
    FacebookInstagramCaption = 'Facebook or Instagram Caption',
    LinkedinPost = 'Linkedin Post',
    KeywordGenerator = 'Keyword Generator',
    KeywordExtractor = 'Keyword Extractor',
    LandingPageCopy = 'Landing Page Copy',
    SEOMetaTitle = 'SEO Meta Title',
    SEOMetaDescription = 'SEO Meta Description',
    GithubIssue = 'GitHub Issue',
}

export function wizardCreatorUseCaseList(): string[] {
    return Object.values(WizardCreatorUseCase);
}

export function wizardCreatorUseCaseEnumOptionFields(): OptionField<string>[] {
    return Object.values(WizardCreatorUseCase).map(v => {
        return {
            value: v,
            text: v
        }
    });
}