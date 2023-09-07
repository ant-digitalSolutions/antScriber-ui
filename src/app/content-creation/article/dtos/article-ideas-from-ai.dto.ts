export class ArticleIdea {

    constructor(init: Partial<ArticleIdea>) {
        Object.assign(this, init);
    }

    primaryKeyword: string;
    secondaryKeywords: string[];
    summary: string;
    title: string;
    toneForArticle: string;
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
