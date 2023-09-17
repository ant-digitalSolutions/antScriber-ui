import { MagicActionEnum } from "../enum/content generation/magic-action.enum";

export interface MagicEditionParamsDto {
    text: string;

    magicActionType: MagicActionEnum

    projectId?: number;
}