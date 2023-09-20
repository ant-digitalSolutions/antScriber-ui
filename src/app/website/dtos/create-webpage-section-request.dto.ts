import { ContentType } from 'src/app/common/enum/content generation/content-type.enum';
import { ContentTone } from './../../common/enum/content generation/content-tone.enum';
/**
 * Used to create a new webpage section.
 * 
 * This is for a section that doesn't exist and has to be created from
 * scratch.
 *
 * @export
 * @class WebpageSectionCreateDto
 */
export class WebpageSectionCreateDto {
    webpageId: number;

    summary: string;

    title?: string;

    contentType: ContentType;

    contentTone: ContentTone;
}