import { UseCaseGitHubIssue as UseCase_Coding_GitHubIssue } from './data/coding/use-case-github-issue';
import { UseCase_Coding_ImplementCode } from './data/coding/use-case-implement-code';
import { UseCase_General_Message } from './data/general/use-case-general-message';
import { UseCase_Internal_UseCaseMeta } from './data/internal-dev/use-case-internal-use-case-meta';
import { UseCase_Learning_Explain } from './data/learning/use-case-learning-explain';
import { UseCase_Learning_HowTo } from './data/learning/use-case-learning-howTo';
import { UseCase_Marketing_Email } from './data/marketing/use-case-marketing-email';
import { UseCase_Marketing_Facebook } from './data/marketing/use-case-marketing-facebook';
import { UseCase_Marketing_GoogleAds } from './data/marketing/use-case-marketing-google-ads';
import { UseCase_Marketing_SMS } from './data/marketing/use-case-marketing-sms';
import { UseCase_Social_FacebookPost } from './data/social/use-case-social-facebook';
import { UseCase_Social_InstagramCaption } from './data/social/use-case-social-instagram';
import { UseCase_Social_LinkedinPost } from './data/social/use-case-social-linkedin';
import { UseCase_Social_TwitterThread } from './data/social/use-case-social-twitter-thread';
import { UseCase_Website_SEO } from './data/website/use-case-website-seo';
import { UseCase_Website_PageOutline } from './data/website/use-case-website-website-outline';
import { UseCase_Website_SectionCopy } from './data/website/use-case-website-website-section';
import { UseCaseMetaAbstract } from './use-case-meta.abastract';

export const useCaseIndex: UseCaseMetaAbstract[] = [
  // social
  new UseCase_Social_LinkedinPost(),
  new UseCase_Social_FacebookPost(),
  new UseCase_Social_InstagramCaption(),
  new UseCase_Social_TwitterThread(),

  // marketing
  new UseCase_Marketing_Facebook(),
  new UseCase_Marketing_SMS(),
  new UseCase_Marketing_Email(),
  new UseCase_Marketing_GoogleAds(),

  //website
  new UseCase_Website_SEO(),
  new UseCase_Website_SectionCopy(),
  new UseCase_Website_PageOutline(),

  // general
  new UseCase_General_Message(),

  //learning
  new UseCase_Learning_HowTo(),
  new UseCase_Learning_Explain(),

  // coding
  new UseCase_Coding_GitHubIssue(),
  new UseCase_Coding_ImplementCode(),

    // internal
    new UseCase_Internal_UseCaseMeta(),
];
