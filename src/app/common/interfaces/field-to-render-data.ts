import { ValidatorFn, Validators } from '@angular/forms';
export interface TextFieldToRenderData {
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
    fieldValue?: string;

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
}