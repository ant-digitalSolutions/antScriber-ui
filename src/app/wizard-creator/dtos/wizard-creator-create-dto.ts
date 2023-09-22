import { ContentTone } from "src/app/common/enum/content generation/content-tone.enum";
import { WizardCreatorUseCase } from "../enums/wizard-creator-use-case.enum";
import { ContentCreationCreativityLevel } from "src/app/common/enum/content generation/content-creation-imagination-level.enum";

export class WizardCreatorCreateDto {
    outputLang: string;

    voiceTone: ContentTone;

    useCase: WizardCreatorUseCase;

    description: string;

    amountOfVariants: number;

    creativityLevel: ContentCreationCreativityLevel;

    documentId?: number;
}
