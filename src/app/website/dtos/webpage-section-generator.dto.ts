import { ContentType } from 'src/app/common/enum/content generation/content-type.enum';
import { ContentTone } from './../../common/enum/content generation/content-tone.enum';
export class WebpageSectionGeneratorDto {
    webpageId: number;
    
    webpageSectionId: number;

    summary: string;

    title: string;

    contentType: ContentType;

    contentTone: ContentTone;
}