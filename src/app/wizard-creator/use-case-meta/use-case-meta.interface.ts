import { WizardFormService } from "../services/wizard-form.service";

export interface IUseCaseMeta {
  /**
   * The URL of the icon to render in the button of the use case.
   *
   * @type {string}
   * @memberof IUseCaseMeta
   */
  iconUrl: string;

  /**
   * The name of the icon to use. If this is empty, use the field {iconUrl}
   *
   * @type {string}
   * @memberof IUseCaseMeta
   */
  iconName: string;

  /**
  * True if the use case is selectable; otherwise false.
  *
  * @type {boolean}
  * @memberof IUseCaseMeta
  */
  isAvailable: boolean;

  /**
    * The name of the use case.
    *
    * @type {string}
    * @memberof IUseCaseMeta
    */
  useCaseName: string;

  /**
   * The name of the group that this use case belongs to.
   *
   * @type {string}
   * @memberof IUseCaseMeta
   */
  useCaseGroup: string;

  _wizardFormService: WizardFormService;



  /**
   * The actions to execute after the user select
   *
   * @param {string} buttonToggleName
   * @param {WizardFormService} wizardFormService
   * @memberof IUseCaseMeta
   */
  toggleButtonUpdateActions(buttonToggleName: string): void;

  /**
   * Initialize the data of the fields that conforms the form for the current
   * use case. This method should call all the other methods that init the fields.
   *
   * @memberof IUseCaseMeta
   */
  initFields(_wizardFormService: WizardFormService): void;

  /**
   * Initialize the text fields for the current use case.
   *
   * @memberof IUseCaseMeta
   */
  setTextFieldsData(): void;

  /**
   * Init the checkbox fields.
   *
   * @memberof IUseCaseMeta
   */
  setCheckboxFieldsData(): void;

  /**
   * Init the select fields.
   *
   * @memberof IUseCaseMeta
   */
  setSelectorFieldsData(): void;

  /**
   * Init the toggle button.
   *
   * @memberof IUseCaseMeta
   */
  setButtonToggleData(): void;

  /**
   * Clean all the data in the form.
   *
   * @memberof IUseCaseMeta
   */
  cleanFormData(): void;

  /**
   * Set the default fields of the form to use with the current use case.
   *
   * @memberof IUseCaseMeta
   */
  setDefaultFieldsToUse(): void;

  /**
   * Call to run the logic to destroy the listeners of the use case class.
   *
   * @memberof IUseCaseMeta
   */
  destroy(): void;
}