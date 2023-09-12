import { KeywordDetailsDto } from "src/app/blogger/dto/keywords/keyword-details.dto";

/**
 * Contains the needed data to generate and article
 * from the User ideas
 *
 * @export
 * @class GenerateArticleDto
 */
export class ArticleGenerationParamsDto {
    /**
     *
     */
    constructor(init: Partial<ArticleGenerationParamsDto>) {
        Object.assign(this, init)
    }

    blogName: string;

    articleIdea: string;

    amountOfWords: number;

    addCTA: boolean;

    blogProjectId: number;

    primaryKeyword: KeywordDetailsDto;

    secondaryKeywords: KeywordDetailsDto[];
}