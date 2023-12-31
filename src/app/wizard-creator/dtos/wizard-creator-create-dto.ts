import { ContentCreationCreativityLevel } from "src/app/common/enum/content generation/content-creation-imagination-level.enum";
import { ContentTone } from "src/app/common/enum/content generation/content-tone.enum";
import { OpenAiGPTVersionEnum } from "src/app/common/enum/content generation/openai-gtp-version.enum";

export class WizardCreatorCreateDto {
    outputLang: string;

    voiceTone: ContentTone;

    description: string;

    amountOfVariants: number;

    creativityLevel: ContentCreationCreativityLevel;

    documentId?: number;

    /**
     * Contains the selected value of the WizardCreatorUseCaseGroup enum.
     *
     * @type {string}
     * @memberof WizardCreatorCreateDto
     */
    useCaseGroup: string;

    /**
     * Contains the specific use case the belongs to the selected group.
     * 
     * This value should be mapped in the server to the corresponding Enum.
     *
     * @type {string}
     * @memberof WizardCreatorCreateDto
     */
    useCase: string;

    gptVersion: OpenAiGPTVersionEnum;

    /**
   * Contains additional from the user that is needed to generate the prompt.
   * This data is variable for each use-case.
   *
   * This field is an object that contains variable fields
   *
   * @type {*}
   * @memberof WizardCreatorCreateDto
   */
    data: any;
}
