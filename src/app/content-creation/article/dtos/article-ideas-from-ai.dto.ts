export interface ArticleIdea {
    primaryKeyword: string;
    secondaryKeywords: string[];
    summary: string;
    title: string;
    toneForArticle: string;
}

export interface ArticleIdeasResponse {
    ideas: ArticleIdea[];
}
