import { OptionField } from "../dto/option-field.dto";

export enum LangEnum {
    English = 'English',
    Spanish = 'Spanish',
    German = 'German',
    French = 'French',
    Russian = 'Russian',
    Italian = 'Italian',
    Portuguese = 'Portuguese',
    Dutch = 'Dutch',
    Polish = 'Polish',
    Greek = 'Greek',
    Swedish = 'Swedish',
    Danish = 'Danish',
    Finnish = 'Finnish',
    Norwegian = 'Norwegian',
    Ukrainian = 'Ukrainian',
    Romanian = 'Romanian',
    Hungarian = 'Hungarian',
    Czech = 'Czech',
    Serbian = 'Serbian',
    Croatian = 'Croatian',
    Bulgarian = 'Bulgarian',
    Slovak = 'Slovak',
    Belarusian = 'Belarusian',
    Icelandic = 'Icelandic',
    Albanian = 'Albanian',
    Mandarin = 'Mandarin',
    Hindi = 'Hindi',
    Bengali = 'Bengali',
    Japanese = 'Japanese',
    Urdu = 'Urdu',
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