import { OptionField } from "../../dto/option-field.dto";

// export enum ContentTone {
//     Informative = 'Informative',
//     Formal = 'Formal',
//     Professional = 'Professional',
//     Humorous = 'Humorous and Witty',
//     Inspirational = 'Inspirational',
//     Friendly = 'Friendly',
//     Curious = 'Curious',
//     Optimistic = 'Optimistic',
//     Pessimistic = 'Pessimistic',
// }

export enum ContentTone {
    Friendly = 'Friendly',
    Appreciative = 'Appreciative',
    Assertive = 'Assertive',
    Candid = 'Candid',
    Casual = 'Casual',
    Cautionary = 'Cautionary',
    Compassionate = 'Compassionate',
    Conversational = 'Conversational',
    Convincing = 'Convincing',
    Critical = 'Critical',
    Earnest = 'Earnest',
    Enthusiastic = 'Enthusiastic',
    Formal = 'Formal',
    Humble = 'Humble',
    Humorous = 'Witty or Humorous',
    Informative = 'Informative',
    Inspirational = 'Inspirational',
    Joyful = 'Joyful',
    Reflective = 'Reflective',
    Passionate = 'Passionate',
    Professional = 'Professional',
    Thoughtful = 'Thoughtful',
    Urgent = 'Urgent',
    Worried = 'Worried'
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