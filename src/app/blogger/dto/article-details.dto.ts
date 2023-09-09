export class IArticleDetailsDto {
    id: number;

    title: string;
    
    body: string;

    primaryKeyword?: string;

    secondaryKeywords?: string;

    seoTitle?: string;

    seoMetaDescription?: string;

    excerpt?: string;

    status?: string;

    tags?: string[];

    categories?: string[];

    faqScript?: string;
}