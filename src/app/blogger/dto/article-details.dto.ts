import { environment } from "src/environments/environment";
import { KeywordDetailsDto } from "./keywords/keyword-details.dto";

export class IArticleDetailsDto {
    id: number;

    title: string;
    
    body: string;

    primaryKeyword?: KeywordDetailsDto;

    secondaryKeywords?: KeywordDetailsDto[];

    seoTitle?: string;

    seoMetaDescription?: string;

    excerpt?: string;

    status?: string;

    tags?: string[];

    categories?: string[];

    faqScript?: string;

    featureImagePath?: string;
}