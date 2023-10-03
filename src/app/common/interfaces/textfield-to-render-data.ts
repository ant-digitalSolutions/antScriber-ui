import { ValidatorFn, Validators } from '@angular/forms';
export class TextFieldToRenderData {
    /**
     * The text to show as placeholder.
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    placeholder: string;

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
     * A list of Validators to apply on the field
     *
     * @type {Validators[]}
     * @memberof TextFieldToRenderData
     */
    validators: any[];


    /**
     * the name of the field to use in the dynamic `data` field that is send to the server
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    dataName: string;

    /**
     * Indicates if it should render a text-area or simple input.
     *
     * @type {boolean}
     * @memberof TextFieldToRenderData
     */
    isLongText?: boolean;

    inputMaxLen: number;

    /**
     * Contains the text to render in the tooltip of the element
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    tooltipText?: string;
}