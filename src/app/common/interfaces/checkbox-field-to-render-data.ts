import { ValidatorFn, Validators } from '@angular/forms';
export class CheckboxFieldToRenderData {
    /**
     * The initial value of the field, if any.
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    fieldValue: boolean;

    /**
     * The human name of the field to show to the user.
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    fieldLabel: string;

    /**
     * the name of the field to use in the dynamic `data` field that is send to the server
     *
     * @type {string}
     * @memberof TextFieldToRenderData
     */
    dataName: string;
}