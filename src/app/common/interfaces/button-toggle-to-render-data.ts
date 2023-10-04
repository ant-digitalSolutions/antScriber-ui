import { OptionField } from "../dto/option-field.dto";

export interface SelectorFieldToRenderData {
    /**
   * The initial value of the field, if any.
   *
   * @type {string}
   * @memberof TextFieldToRenderData
   */
    fieldValue?: any;

    /**
     * The human name of the field to show to the user.
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    fieldLabel: string;

    /**
     * Contains the text to render in the tooltip of the element
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    tooltipText?: string;

    /**
    * the name of the field to use in the dynamic `data` field that is send to the server
    *
    * @type {string}
    * @memberof TextFieldToRenderData
    */
    dataName: string;

    values: OptionField<string>[]
}