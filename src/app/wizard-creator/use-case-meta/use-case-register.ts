import { UseCaseGitHubIssue as UseCase_Coding_GitHubIssue } from "./data/coding/use-case-github-issue";
import { UseCase_Coding_ImplementCode } from "./data/coding/use-case-implement-code";
import { UseCase_Marketing_Email } from "./data/marketing/use-case-marketing-email";
import { UseCase_Marketing_Facebook } from "./data/marketing/use-case-marketing-facebook";
import { UseCase_Marketing_GoogleAds } from "./data/marketing/use-case-marketing-google-ads";
import { UseCase_Marketing_SMS } from "./data/marketing/use-case-marketing-sms";
import { UseCase_Social_FacebookPost } from "./data/social/use-case-social-facebook";
import { UseCase_Social_InstagramCaption } from "./data/social/use-case-social-instagram";
import { UseCase_Social_LinkedinPost } from "./data/social/use-case-social-linkedin";
import { UseCase_Social_TwitterThread } from "./data/social/use-case-social-twitter-thread";
import { UseCaseMetaAbstract } from "./use-case-meta.abastract";

export const useCaseIndex: UseCaseMetaAbstract[] = [
    new UseCase_Coding_GitHubIssue(),
    new UseCase_Coding_ImplementCode(),
    new UseCase_Social_LinkedinPost(),
    new UseCase_Social_FacebookPost(),
    new UseCase_Social_InstagramCaption(),
    new UseCase_Social_TwitterThread(),
    
    // marketing
    new UseCase_Marketing_Facebook(),
    new UseCase_Marketing_SMS(),
    new UseCase_Marketing_Email(),
    new UseCase_Marketing_GoogleAds()
]
