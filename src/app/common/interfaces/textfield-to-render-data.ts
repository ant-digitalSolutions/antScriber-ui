import { IBaseFieldToRenderData } from './base-field-data.interface';
export interface TextFieldToRenderData extends IBaseFieldToRenderData {
    /**
     * The text to show as placeholder.
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    placeholder: string;

    /**
     * A list of Validators to apply on the field
     *
     * @type {Validators[]}
     * @memberof TextFieldToRenderData
     */
    validators: any[];

    /**
     * Indicates if it should render a text-area or simple input.
     *
     * @type {boolean}
     * @memberof TextFieldToRenderData
     */
    isLongText?: boolean;

    inputMaxLen: number;
}