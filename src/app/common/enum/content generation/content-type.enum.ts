import { OptionField } from "../../dto/option-field.dto";

export enum ContentType {
    ShortParagraph = 'Short Paragraph',
    List = 'Bulleted List',
    ShortParagraphWithSubSections = 'Short Paragraph With Sub-Sections'
}

export function contentTypeList(): string[] {
    return Object.values(ContentType);
}

export function contentTypeOptionFields(): OptionField<string>[] {
    return Object.values(ContentType).map(v => {
        return {
            value: v,
            text: v
        }
    });
}