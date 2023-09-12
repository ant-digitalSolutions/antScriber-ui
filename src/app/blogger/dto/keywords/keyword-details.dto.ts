import { KeywordTypeEnum } from "../../enums/keyword-type.enum";

export class KeywordDetailsDto {
    id: number;

    name: string;

    googleRanking?: number;

    googleImpressions?: number;

    googleCTR?: number;

    blogProjectId?: number;
}
