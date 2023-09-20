import { OptionField } from "../../dto/option-field.dto";

/**
 * Contains the level of creativity to be used in
 * the content generation through AI.
 *
 * @export
 * @enum {number}
 */
export enum ContentCreationCreativityLevel {
    Zen = 'Zen Master',
    Neutral = 'Plain Jane',
    Low = 'Tickling the Muse',
    Medium = 'Cooking with Magic',
    High = 'Dream Weaver',
    Max = 'Galactic Overlord'
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