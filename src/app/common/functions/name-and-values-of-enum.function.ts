import { OptionField } from "../dto/option-field.dto";

// export function enumValues()<T>: string[] {
//     return Object.values(T);
// }

export function mapEnumNameAndValue(enumObject: any): OptionField<any>[] {
    return Object.keys(enumObject)
        .filter(key => isNaN(Number(key)))  // Filter out numeric keys
        .map(key => ({
            value: enumObject[key] as string,
            text: enumObject[key] as string  // Assuming that T is string-indexable
        }));
}