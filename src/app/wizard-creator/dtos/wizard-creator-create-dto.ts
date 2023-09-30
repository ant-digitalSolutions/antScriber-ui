import { ContentTone } from "src/app/common/enum/content generation/content-tone.enum";
import { WizardCreatorUseCase } from "../enums/wizard-creator-use-case.enum";
import { ContentCreationCreativityLevel } from "src/app/common/enum/content generation/content-creation-imagination-level.enum";
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
}
