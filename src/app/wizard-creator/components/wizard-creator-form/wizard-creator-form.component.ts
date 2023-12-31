import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { ContentCreationCreativityLevel, creativityLevelOptionFields } from 'src/app/common/enum/content generation/content-creation-imagination-level.enum';
import { ContentTone, contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { OpenAiGPTVersionEnum } from 'src/app/common/enum/content generation/openai-gtp-version.enum';
import { langEnumOptionFields } from 'src/app/common/enum/lang-options.enum';
import { mapEnumNameAndValue } from 'src/app/common/functions/name-and-values-of-enum.function';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { UserInitializationWalkthroughTourStepsEnum } from 'src/app/walkthrough-tours/enums/walkthrough-tour-user-initialization-steps-id.enum';
import { WalkthroughTourIdEnum } from 'src/app/walkthrough-tours/enums/walktrough-tour-id.enum';
import { UserInitTourService } from 'src/app/walkthrough-tours/user-init-tour.service';
import { WizardDefaultFieldNamesEnum } from '../../enums/wizard-default-fields-names.enum';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { WizardFormService } from '../../services/wizard-form.service';

@Component({
  selector: 'app-wizard-creator-form',
  templateUrl: './wizard-creator-form.component.html',
  styleUrls: ['./wizard-creator-form.component.scss'],
})
export class WizardCreatorFormComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  MAX_AMOUNT_OPTIONS = 5;

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  wizardDescription: string;

  selectorFields: SelectorFieldToRenderData[];

  textFields: TextFieldToRenderData[];

  /**
   * Indicates if the data is ready. If true, render th content.
   *
   * @memberof WizardCreatorFormComponent
   */
  dataReady = false;

  /**
   * If true the default description field will be shown.
   *
   * @memberof WizardCreatorFormComponent
   */
  showDescriptionField = true;

  /**
   * Indicate if the user selected a use case.
   *
   * If true, render the dynamic field content.
   *
   * @memberof WizardCreatorFormComponent
   */
  useCaseSelected = false;

  isMobile: boolean = false;

  // showGenerateBtn = false;

  @ViewChild('formElements') formElements: ElementRef;

  // indicate if we already bound the click event on the form elements
  formClickEventSet = false;

  constructor(
    private _wizardCreatorService: WizardCreatorService,
    private projectService: BlogProjectsService,
    private _wizardFormService: WizardFormService,
    private _useCaseService: WizardUseCaseService,
    private _userInitTour: UserInitTourService
  ) {}
  ngAfterViewInit(): void {
    this.setFormEventClick();
  }

  ngOnInit(): void {
    this.selectorFields = [];
    this.textFields = [];

    // TODO: move the next declaration to file
    this.initTextFields();
    this.initContentToneOptions();
    this.initLangEnumOptions();
    this.initCreativityLevelOptions();
    this.initVariantsOptions();
    this.setListeners();
    this.initGPTVersionOptions();

    this.dataReady = true;

    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this), false);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  generateContent(): void {
    this.isLoading = true;
    this._wizardCreatorService.generateContent().subscribe({
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  setListeners() {
    this.projectService.selectedProjectId$.subscribe((projectId) => {
      if (projectId !== -1) {
        this.currentProjectId = projectId;
      }
    });

    this._wizardCreatorService.wizardCreatedContent$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.isLoading = false;

        // user initialization walkthrough tour
        if (
          this._userInitTour.isActive &&
          this._userInitTour.tourId ===
            WalkthroughTourIdEnum.UserInitialization &&
          this._userInitTour.currentStepId ===
            UserInitializationWalkthroughTourStepsEnum.UnleashAssistant
        ) {
          this._userInitTour.next();
        }
      });

    this._useCaseService.wizardUseCase$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.useCaseSelected = true;
        this.setFormEventClick();
      });

    this._wizardFormService.additionalDataFieldWithError$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => this.scrollToWizardInputWithError());

    this._userInitTour.walkthroughTouStepShowEvent$
      .pipe(
        takeUntil(this.componentDestroyed$),
        takeUntil(this._userInitTour.walkthroughTourEnded$)
      )
      .subscribe((stepId) => {
        if (
          stepId === UserInitializationWalkthroughTourStepsEnum.UnleashAssistant
        ) {
          this._wizardFormService.updateAdditionalData(
            'postThemeIdea',
            `I found a new tool to boost my productivity, Adfluens. Check it out now and start for free: https://adfluens.io.`
          );
          const postThemeIdea =
            this._wizardFormService._additionalDataFormFields.find(
              (f) => f.fieldName === 'postThemeIdea'
            );
          postThemeIdea?.formControl.setValue(
            `I found a new tool to boost my productivity, Adfluens. Check it out now and start for free: https://adfluens.io.`
          );
        }
      });
  }

  initTextFields() {
    this.textFields.push({
      placeholder: 'E.g. "Describe the benefits of solar energy"',
      fieldLabel: 'Instruction',
      fieldValue: ``,
      validators: [
        Validators.required,
        Validators.maxLength(4000),
        Validators.minLength(10),
      ],
      inputMaxLen: 4000,
      dataName: WizardDefaultFieldNamesEnum.Instruction,
      tooltipText: 'Detailed instruction to generate the desired content.',
      isLongText: true,
    });
  }

  initContentToneOptions() {
    this.selectorFields.push({
      fieldLabel: 'Voice Tone',
      fieldValue: ContentTone.Friendly,
      dataName: WizardDefaultFieldNamesEnum.VoiceTone,
      tooltipText: 'The voice tone to use.',
      values: contentToneOptionFields(),
    });
  }

  initGPTVersionOptions() {
    this.selectorFields.push({
      fieldLabel: 'GPT Version',
      fieldValue: OpenAiGPTVersionEnum.GPT3,
      dataName: WizardDefaultFieldNamesEnum.GtpVersion,
      tooltipText: 'GPT version to use.',
      values: mapEnumNameAndValue(OpenAiGPTVersionEnum),
      className: 'gpt-version-selector',
    });
  }

  initLangEnumOptions() {
    this.selectorFields.push({
      fieldLabel: 'Output Lang',
      fieldValue: 'English',
      dataName: WizardDefaultFieldNamesEnum.OutputLang,
      tooltipText: 'The desired language for the output content.',
      values: langEnumOptionFields(),
    });
  }

  initCreativityLevelOptions() {
    this.selectorFields.push({
      fieldLabel: 'Imagination Level',
      fieldValue: ContentCreationCreativityLevel.Zen,
      dataName: WizardDefaultFieldNamesEnum.ImaginationSelector,
      tooltipText: 'How much imagination to apply?',
      values: creativityLevelOptionFields(),
      className: 'imagination-selector',
    });
  }

  initVariantsOptions() {
    const x: number[] = new Array(this.MAX_AMOUNT_OPTIONS)
      .fill(0)
      .map((_, index) => index + 1);
    const variantOptions = x.map((v) => {
      return {
        value: v,
        text: v.toString(),
      };
    });

    this.selectorFields.push({
      fieldLabel: '# of Results',
      fieldValue: 1,
      dataName: WizardDefaultFieldNamesEnum.AmountOfVariants,
      tooltipText: '# of variants to generate.',
      values: variantOptions,
    });
  }

  selectorData(dataName: string): SelectorFieldToRenderData {
    const data = this.selectorFields.find((d) => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`);
    }
  }

  textFieldData(dataName: string): TextFieldToRenderData {
    const data = this.textFields.find((d) => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`);
    }
  }

  checkIfFieldRender(fieldName: string): boolean {
    return this._wizardFormService.checkIfFieldShouldRender(fieldName);
  }

  resetForm() {
    this._wizardFormService.resetFormData();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 960;
  }

  scrollToWizardInputWithError() {
    const element = document.querySelector(
      '.wizard-field-with-error'
    ) as HTMLElement;
    element.scrollIntoView();
  }

  // event that the element was clicked. To we should close the use
  // case selector
  onClick(_event: Event) {
    this._useCaseService.closeSelector();
  }

  setFormEventClick() {
    setTimeout(() => {
      if (!this.formClickEventSet && this.formElements) {
        this.formElements.nativeElement.addEventListener(
          'click',
          this.onClick.bind(this)
        );
        this.formClickEventSet = true;
      }
    }, 3000);
  }

  public get showGenerateBtn(): boolean {
    return this._useCaseService.showGenerateBtn;
  }
}
