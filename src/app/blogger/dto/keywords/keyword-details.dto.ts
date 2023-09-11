import { KeywordTypeEnum } from "../../enums/keyword-type.enum";

export class KeywordDetailsDto {
    id: number;

    name: string;

    keywordType: KeywordTypeEnum;

    googleRanking: number;

    googleImpressions: number;

    googleCTR: number;

    blogProjectId: number;
}
