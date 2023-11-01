export interface IBaseFieldToRenderData {
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

    /**
     * The name of the class to assign the element.
     *
     * @type {string}
     * @memberof IBaseFieldToRenderData
     */
    className?: string;
}