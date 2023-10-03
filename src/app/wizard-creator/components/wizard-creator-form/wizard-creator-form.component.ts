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

@Component({
  selector: 'app-wizard-creator-form',
  templateUrl: './wizard-creator-form.component.html',
  styleUrls: ['./wizard-creator-form.component.scss']
})
export class WizardCreatorFormComponent implements OnDestroy, OnInit {



  MAX_AMOUNT_OPTIONS = 5;


  componentDestroyed$: Subject<boolean> = new Subject();

  wizardCreatorForm: FormGroup;

  isLoading = false;

  contentToneOptions: OptionField<string>[];

  langEnumOptions: OptionField<string>[];

  creativityLevelOptions: OptionField<string>[];

  wizardUseCaseOptions: OptionField<string>[];

  variantsOptions: OptionField<number>[];
  currentProjectId: number;

  wizardDescription: string;

  wizardDescriptionValidators = [Validators.required, Validators.minLength(10), Validators.maxLength(800)]

  gptVersionOptions: OptionField<string>[];

  /**
   * If true the default description field will be shown.
   *
   * @memberof WizardCreatorFormComponent
   */
  showDescriptionField = true;

  constructor(
    private _wizardCreatorService: WizardCreatorService, 
    private projectService: BlogProjectsService,
    private _wizardFormService: WizardFormService) {

  }

  ngOnInit(): void {
    this.initContentToneOptions();
    this.initLangEnumOptions();
    this.initCreativityLevelOptions();
    this.initwizardUseCaseOptions()
    this.initVariantsOptions();
    this.initForm();
    this.setListeners();
    this.initGPTVersionOptions()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  generateContent(): void {

    if (this.wizardCreatorForm.valid) {
      this.isLoading = true;
      const formValue = this.wizardCreatorForm.value;

      formValue.projectId = this.currentProjectId;
      this._wizardCreatorService.generateContent(formValue).subscribe(r => {
        if (Object.keys(r).length === 0) {
          this.isLoading = false;
        }
      });
    }
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

    this._wizardFormService.fieldToRenderUpdate$.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(() => this.setConditionalFields())
  }

  setConditionalFields(): void {
    if (this._wizardFormService.showCreativityInput) {
      this.wizardCreatorForm.addControl('creativityLevel', new FormControl(ContentCreationCreativityLevel.Zen, Validators.required))
    }
    if (this._wizardFormService.showDescriptionInput) {
      this.wizardCreatorForm.addControl('description', new FormControl('', [Validators.required, Validators.minLength(3)]))
    }
    if (this._wizardFormService.showLangInput) {
      this.wizardCreatorForm.addControl('outputLang', new FormControl('', Validators.required))
    }
    if (this._wizardFormService.showToneInput) {
      this.wizardCreatorForm.addControl('voiceTone', new FormControl(ContentTone.Informative, Validators.required))
    }
    if (this._wizardFormService.showNumberOfVariantsToGenerate) {
      this.wizardCreatorForm.addControl('amountOfVariants', new FormControl(1, [Validators.required, Validators.min(1)]))
    }
  }

  initForm() {
    this.wizardCreatorForm = new FormGroup({
      gptVersion: new FormControl(OpenAiGPTVersionEnum.GPT3, Validators.required)
    });
  }

  initContentToneOptions() {
    this.contentToneOptions = contentToneOptionFields();
  }

  initGPTVersionOptions() {
    this.gptVersionOptions = mapEnumNameAndValue(OpenAiGPTVersionEnum);
  }

  setContentTone(voiceTone: any) {
    this.wizardCreatorForm.get('voiceTone')?.setValue(voiceTone);
  }

  initLangEnumOptions() {
    this.langEnumOptions = langEnumOptionFields();
  }

  setLang(lang: any) {
    this.wizardCreatorForm.get('outputLang')?.setValue(lang);
  }

  initCreativityLevelOptions() {
    this.creativityLevelOptions = creativityLevelOptionFields();
  }

  setCreativityLevel(creativityLevel: any) {
    this.wizardCreatorForm.get('creativityLevel')?.setValue(creativityLevel);
  }

  setGptVersion(gptVersion: any) {
    this.wizardCreatorForm.get('gptVersion')?.setValue(gptVersion);
  }

  initwizardUseCaseOptions() {
    this.wizardUseCaseOptions = wizardCreatorUseCaseEnumOptionFields();
  }

  setWizardUseCase(useCase: any) {
    this.wizardCreatorForm.get('useCase')?.setValue(useCase);
  }

  initVariantsOptions() {
    const x: number[] = new Array(this.MAX_AMOUNT_OPTIONS).fill(0).map((_, index) => index + 1);
    this.variantsOptions = x.map(v => {
      return {
        value: v,
        text: v.toString()
      }
    });
  }

  setVariants(variants: number) {
    this.wizardCreatorForm.get('amountOfVariants')?.setValue(variants);
  }

  setWizardDescription(description: string) {
    this.wizardDescription = description;
    this.wizardCreatorForm.get('description')?.setValue(description);

  }

  
  public get showDescription() : boolean {
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
