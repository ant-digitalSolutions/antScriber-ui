import { OptionField } from "../../dto/option-field.dto";

/**
 * Contains the level of creativity to be used in
 * the content generation through AI.
 *
 * @export
 * @enum {number}
 */
export enum ContentCreationCreativityLevel {
    Zen = 'Zen Master (Optimal Creativity)',
    Low = 'Gentle Nudge (Low Creativity)',
    Medium = 'Inspired Flow (Balanced)',
    High = 'Vivid Imagination (High Creativity)',
    Max = 'Boundless Artistry (Max Creativity)',
}

export function creativityLevelList(): string[] {
    return Object.values(ContentCreationCreativityLevel);
}

export function creativityLevelOptionFields(): OptionField<string>[] {
    return Object.values(ContentCreationCreativityLevel).map(v => {
        return {
            value: v,
            text: v
        }
    });
}