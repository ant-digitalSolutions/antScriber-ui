export class ArticleIdea {

    constructor(init: Partial<ArticleIdea>) {
        Object.assign(this, init);
    }

    primaryKeyword: string;
    secondaryKeywords: string;
    summary: string;
    title: string;
    toneForArticle: string;

    public get secondaryKeywordsList(): string[] {
        return this.secondaryKeywords.split(',')
    }

    containsSearchTerm(searchTerm: string): boolean {
        return (this.primaryKeyword?.includes(searchTerm) ?? false) ||
            (this.secondaryKeywords?.includes(searchTerm) ?? false) ||
            (this.summary?.includes(searchTerm) ?? false) ||
            (this.title?.includes(searchTerm) ?? false);
    }
}

export class ArticleIdeasResponse {

    constructor(init: Partial<ArticleIdeasResponse>) {
        this.ideas = [];

        init.ideas!.forEach(idea => {
            this.ideas.push(new ArticleIdea(idea))
        });
    }

    ideas: ArticleIdea[];
}
