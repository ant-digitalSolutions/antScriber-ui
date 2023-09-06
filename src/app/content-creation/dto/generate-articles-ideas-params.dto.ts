export class ArticleIdeasParamsDto {

    constructor(init: Partial<ArticleIdeasParamsDto>) {
       Object.assign(this, init);
    }

    blogName: string;

    primaryKeyword: string;

    secondaryKeywords: string;

    amountOfIdeas: number;

    shortDescription: string;

    blogUrl: string;
}
