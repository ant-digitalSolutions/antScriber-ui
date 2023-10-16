import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subject, takeUntil, tap } from 'rxjs';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import {Validators } from '@angular/forms';
import { ContentTone, contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { langEnumOptionFields } from 'src/app/common/enum/lang-options.enum';
import { ContentCreationCreativityLevel, creativityLevelOptionFields } from 'src/app/common/enum/content generation/content-creation-imagination-level.enum';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { mapEnumNameAndValue } from 'src/app/common/functions/name-and-values-of-enum.function';
import { OpenAiGPTVersionEnum } from 'src/app/common/enum/content generation/openai-gtp-version.enum';
import { WizardFormService } from '../../services/wizard-form.service';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';
import { WizardDefaultFieldNamesEnum } from '../../enums/wizard-default-fields-names.enum';

@Component({
  selector: 'app-wizard-creator-form',
  templateUrl: './wizard-creator-form.component.html',
  styleUrls: ['./wizard-creator-form.component.scss']
})
export class WizardCreatorFormComponent implements OnDestroy, OnInit {

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

  constructor(
    private _wizardCreatorService: WizardCreatorService,
    private projectService: BlogProjectsService,
    private _wizardFormService: WizardFormService,
    private _useCaseService: WizardUseCaseService) {

  }

  ngOnInit(): void {
    this.selectorFields = [];
    this.textFields = [];
    this.initTextFields();
    this.initContentToneOptions();
    this.initLangEnumOptions();
    this.initCreativityLevelOptions();
    this.initVariantsOptions();
    this.setListeners();
    this.initGPTVersionOptions()

    this.dataReady = true;

    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile.bind(this), false)
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  generateContent(): void {
    this.isLoading = true;

    this._wizardCreatorService.generateContent().subscribe(r => {
      if (Object.keys(r).length === 0) {
        this.isLoading = false;
      }
    });
  }

  setListeners() {
    this.projectService.selectedProjectId$.subscribe(projectId => {
      if (projectId !== -1) {
        this.currentProjectId = projectId;
      }
    });

    this._wizardCreatorService.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$)).subscribe(r => {
      this.isLoading = false;
    })

    this._useCaseService.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(() => {
      this.useCaseSelected = true;
    });

    this._wizardFormService
    .additionalDataFieldWithError$.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(() => this.scrollToWizardInputWithError())


  }

  initTextFields() {
    this.textFields.push({
      placeholder: 'E.g. "Describe the benefits of solar energy"',
      fieldLabel: 'Instruction',
      fieldValue: ``,
      validators: [Validators.required, Validators.maxLength(4000), Validators.minLength(10)],
      inputMaxLen: 4000,
      dataName: WizardDefaultFieldNamesEnum.Instruction,
      tooltipText: 'Detailed instruction to generate the desired content.',
      isLongText: true
    });
  }

  initContentToneOptions() {
    this.selectorFields.push({
      fieldLabel: 'Voice Tone',
      fieldValue: ContentTone.Friendly,
      dataName: WizardDefaultFieldNamesEnum.VoiceTone,
      tooltipText: 'The voice tone to use.',
      values: contentToneOptionFields()
    });
  }

  initGPTVersionOptions() {
    this.selectorFields.push({
      fieldLabel: 'Sorcery Level',
      fieldValue: OpenAiGPTVersionEnum.GPT3,
      dataName: WizardDefaultFieldNamesEnum.GtpVersion,
      tooltipText: 'GPT version to use.',
      values: mapEnumNameAndValue(OpenAiGPTVersionEnum)
    });
  }

  initLangEnumOptions() {
    this.selectorFields.push({
      fieldLabel: 'Output Lang',
      fieldValue: 'English',
      dataName: WizardDefaultFieldNamesEnum.OutputLang,
      tooltipText: 'The desired language for the output content.',
      values: langEnumOptionFields()
    });
  }

  initCreativityLevelOptions() {
    this.selectorFields.push({
      fieldLabel: 'Creative Level',
      fieldValue: ContentCreationCreativityLevel.Zen,
      dataName: WizardDefaultFieldNamesEnum.ImaginationSelector,
      tooltipText: 'How much imagination to apply?',
      values: creativityLevelOptionFields()
    });
  }

  initVariantsOptions() {
    const x: number[] = new Array(this.MAX_AMOUNT_OPTIONS).fill(0).map((_, index) => index + 1);
    const variantOptions = x.map(v => {
      return {
        value: v,
        text: v.toString()
      }
    });

    this.selectorFields.push({
      fieldLabel: '# of Spells',
      fieldValue: 1,
      dataName: WizardDefaultFieldNamesEnum.AmountOfVariants,
      tooltipText: '# of variants to generate.',
      values: variantOptions
    });
  }

  selectorData(dataName: string): SelectorFieldToRenderData {
    const data = this.selectorFields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  textFieldData(dataName: string): TextFieldToRenderData {
    const data = this.textFields.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  checkIfFieldRender(fieldName: string) : boolean {
    return this._wizardFormService.checkIfFieldShouldRender(fieldName);
  }

  resetForm() {
    this._wizardFormService.resetFormData()
  }

  checkIfMobile() {
    this.isMobile = (window.innerWidth < 960);
  }

  scrollToWizardInputWithError() {
    const element = document.querySelector('.wizard-field-with-error') as HTMLElement;
    element.scrollIntoView();
  }

  
  public get showGenerateBtn() : boolean {
    return this._useCaseService.showGenerateBtn;
  }
  
}
