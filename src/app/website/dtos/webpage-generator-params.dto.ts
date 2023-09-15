import { KeywordDetailsDto } from "src/app/blogger/dto/keywords/keyword-details.dto";
import { WebpageType } from "../enums/webpage-type.enum";

export class WebpageGenerateParams {

    constructor(init: Partial<WebpageGenerateParams>) {
        Object.assign(this, init);
    }
 
    shortDescription: string;
    
    pageTitle: string;

    secondaryKeywords?: KeywordDetailsDto[];

    primaryKeyword: KeywordDetailsDto;

    webpageType: WebpageType;

    websiteId: number;

    whatToPromote: string;
}
