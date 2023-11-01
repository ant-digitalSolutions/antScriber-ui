import { OptionField } from "../dto/option-field.dto";
import { IBaseFieldToRenderData } from "./base-field-data.interface";

export interface SelectorFieldToRenderData extends IBaseFieldToRenderData {
    values: OptionField<any>[]
}