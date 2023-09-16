import { OptionField } from "../../dto/option-field.dto";

export enum ContentTone {
    Informative = 'Informative',
    Formal = 'Formal',
    Professional = 'Professional',
    Humorous = 'Humorous and Witty',
    Inspirational = 'Inspirational',
    Friendly = 'Friendly',
    Curious = 'Curious',
    Optimistic = 'Optimistic',
    Pessimistic = 'Pessimistic',
}

export function contentToneList(): string[] {
    return Object.values(ContentTone);
}

export function contentToneOptionFields(): OptionField<string>[] {
    return Object.values(ContentTone).map(v => {
        return {
            value: v,
            text: v
        }
    });
}