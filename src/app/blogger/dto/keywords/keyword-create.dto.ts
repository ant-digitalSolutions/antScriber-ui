import { KeywordTypeEnum } from "../../enums/keyword-type.enum";

export class IKeywordDetailsDto {
    name: string;

    keywordType: KeywordTypeEnum;

    blogProjectId: number;
}
