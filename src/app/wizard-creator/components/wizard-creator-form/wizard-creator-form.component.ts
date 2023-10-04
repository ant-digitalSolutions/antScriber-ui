import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Subject, takeUntil, tap } from 'rxjs';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { ContentTone, contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { langEnumOptionFields } from 'src/app/common/enum/lang-options.enum';
import { ContentCreationCreativityLevel, creativityLevelOptionFields } from 'src/app/common/enum/content generation/content-creation-imagination-level.enum';
import { WizardCreatorUseCase, wizardCreatorUseCaseEnumOptionFields } from '../../enums/wizard-creator-use-case.enum';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { mapEnumNameAndValue } from 'src/app/common/functions/name-and-values-of-enum.function';
import { OpenAiGPTVersionEnum } from 'src/app/common/enum/content generation/openai-gtp-version.enum';
import { WizardFormService } from '../../services/wizard-form.service';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';

@Component({
  selector: 'app-wizard-creator-form',
  templateUrl: './wizard-creator-form.component.html',
  styleUrls: ['./wizard-creator-form.component.scss']
})
export class WizardCreatorFormComponent implements OnDestroy, OnInit {

  wizardUseCaseOptions: OptionField<string>[];

  MAX_AMOUNT_OPTIONS = 5;

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  currentProjectId: number;

  wizardDescription: string;

  gptVersionOptions: OptionField<string>[];

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

  constructor(
    private _wizardCreatorService: WizardCreatorService,
    private projectService: BlogProjectsService,
    private _wizardFormService: WizardFormService) {

  }

  ngOnInit(): void {
    this.selectorFields = [];
    this.textFields = [];
    this.initTextFields();
    this.initContentToneOptions();
    this.initLangEnumOptions();
    this.initCreativityLevelOptions();
    this.initwizardUseCaseOptions()
    this.initVariantsOptions();
    this.setListeners();
    this.initGPTVersionOptions()

    this.dataReady = true;
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

    this._wizardCreatorService.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(() => {
      this.useCaseSelected = true;
    })

  }

  initTextFields() {
    this.textFields.push({
      placeholder: 'E.g. "Describe the benefits of solar energy"',
      fieldLabel: 'Instruction',
      fieldValue: ``,
      validators: [Validators.required, Validators.maxLength(600), Validators.minLength(10)],
      inputMaxLen: 600,
      dataName: 'instruction',
      tooltipText: 'Detailed instruction to generate the desired content.',
      isLongText: true
    });
  }

  initContentToneOptions() {
    this.selectorFields.push({
      fieldLabel: 'Voice Tone',
      fieldValue: ContentTone.Friendly,
      dataName: 'voiceTone',
      tooltipText: 'The voice tone to use.',
      values: contentToneOptionFields()
    });
  }

  initGPTVersionOptions() {
    this.selectorFields.push({
      fieldLabel: 'Sorcery Level',
      fieldValue: OpenAiGPTVersionEnum.GPT3,
      dataName: 'gptVersion',
      tooltipText: 'GPT version to use.',
      values: mapEnumNameAndValue(OpenAiGPTVersionEnum)
    });
  }

  initLangEnumOptions() {
    this.selectorFields.push({
      fieldLabel: 'Output Lang',
      fieldValue: 'English',
      dataName: 'outputLang',
      tooltipText: 'The desired language for the output content.',
      values: langEnumOptionFields()
    });
  }

  initCreativityLevelOptions() {
    this.selectorFields.push({
      fieldLabel: 'Creative Level',
      fieldValue: ContentCreationCreativityLevel.Zen,
      dataName: 'creativityLevel',
      tooltipText: 'How much imagination to apply?',
      values: creativityLevelOptionFields()
    });
  }

  initwizardUseCaseOptions() {
    this.wizardUseCaseOptions = wizardCreatorUseCaseEnumOptionFields();
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
      dataName: 'amountOfVariants',
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


  public get showDescription(): boolean {
    return this._wizardFormService.showDescriptionInput;
  }

  public get showLang(): boolean {
    return this._wizardFormService.showLangInput;
  }

  public get showTone(): boolean {
    return this._wizardFormService.showToneInput;
  }

  public get showCreativity(): boolean {
    return this._wizardFormService.showCreativityInput;
  }

  public get showNumberOfVariantsToGenerate(): boolean {
    return this._wizardFormService.showNumberOfVariantsToGenerate;
  }

  public get showGptVersion(): boolean {
    return this._wizardFormService.showGptVersion;
  }


}
