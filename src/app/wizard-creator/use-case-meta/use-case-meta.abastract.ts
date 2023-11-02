import { Subject, takeUntil } from "rxjs";
import { WizardDefaultFieldNamesEnum } from "../enums/wizard-default-fields-names.enum";
import { WizardFormService } from "../services/wizard-form.service";
import { IUseCaseMeta } from "./use-case-meta.interface";

export abstract class UseCaseMetaAbstract implements IUseCaseMeta {
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

    _classDestroyed$: Subject<boolean> = new Subject();

    /**
     *
     */
    constructor() {

    }

    /**
     * The actions to execute after the user select
     *
     * @param {string} _buttonToggleName
     * @param {WizardFormService} wizardFormService
     * @memberof IUseCaseMeta
     */
    toggleButtonUpdateActions(_buttonToggleName: string): void { }

    /**
     * Initialize the data of the fields that conforms the form for the current
     * use case. This method should call all the other methods that init the fields.
     *
     * @memberof IUseCaseMeta
     */
    initFields(_wizardFormService: WizardFormService): void {
        this._wizardFormService = _wizardFormService;
        this.cleanFormData();
        this.setDefaultFieldsToUse();
        this.setCheckboxFieldsData();
        this.setSelectorFieldsData();
        this.setTextFieldsData();
        this.setButtonToggleData();
        this.setListeners();
    }

    setListeners() {
        this._wizardFormService.buttonToggleUpdate$.pipe(takeUntil(this._classDestroyed$))
            .subscribe(buttonToggleName => {
                this.toggleButtonUpdateActions(buttonToggleName);
            })
    }

    /**
     * Initialize the text fields for the current use case.
     *
     * @memberof IUseCaseMeta
     */
    setTextFieldsData(): void { }

    /**
     * Init the checkbox fields.
     *
     * @memberof IUseCaseMeta
     */
    setCheckboxFieldsData(): void { }

    /**
     * Init the select fields.
     *
     * @memberof IUseCaseMeta
     */
    setSelectorFieldsData(): void { }

    /**
     * Init the toggle button.
     *
     * @memberof IUseCaseMeta
     */
    setButtonToggleData(): void { }

    cleanFormData(): void {
        this._wizardFormService.cleanData();
    }

    setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.ALL,
        ], 'add');
    }

    destroy(): void {
        this._classDestroyed$.next(true);
    }

}