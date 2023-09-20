import { OptionField } from "../dto/option-field.dto";

export enum LangEnum {
    En = 'English',
    Spanish = 'Spanish'
}

export function langList(): string[] {
    return Object.values(LangEnum);
}

export function langEnumOptionFields(): OptionField<string>[] {
    return Object.values(LangEnum).map(v => {
        return {
            value: v,
            text: v
        }
    });
}