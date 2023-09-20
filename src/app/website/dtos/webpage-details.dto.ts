import { KeywordDetailsDto } from "src/app/blogger/dto/keywords/keyword-details.dto";
import { WebpageType } from "../enums/webpage-type.enum";
import { WebpageSectionDto } from "./webpage-section.dto";

export class WebpageDetailsDto {
    constructor(init: Partial<WebpageDetailsDto>) {
        Object.assign(this, init);
    }

    id?: number;

    seoTitle?: string;

    seoMetaDescription?: string;

    excerpt?: string;

    status?: string;

    featureImagePath?: string;

    faqScript?: string;

    webpageSections: WebpageSectionDto[];

    shortDescription: string;

    title: string;

    secondaryKeywords?: KeywordDetailsDto[];

    primaryKeyword: KeywordDetailsDto;

    webpageType: WebpageType;

    blogProjectId: number;

    audienceInterest?: string;

    createdAt?: Date;
}