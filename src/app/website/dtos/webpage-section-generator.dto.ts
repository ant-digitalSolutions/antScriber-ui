import { ContentType } from 'src/app/common/enum/content generation/content-type.enum';
import { ContentTone } from './../../common/enum/content generation/content-tone.enum';
import { WebpageSectionCreateDto } from './create-webpage-section-request.dto';
/**
 *Used to create the content of a webpage section
 *
 * @export
 * @class WebpageSectionContentGeneratorDto
 */
export class WebpageSectionContentGeneratorDto extends WebpageSectionCreateDto {
    webpageSectionId: number;
}