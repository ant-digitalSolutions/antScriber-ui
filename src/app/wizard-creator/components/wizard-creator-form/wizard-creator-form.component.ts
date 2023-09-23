import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { ContentTone, contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { langEnumOptionFields } from 'src/app/common/enum/lang-options.enum';
import { ContentCreationCreativityLevel, creativityLevelOptionFields } from 'src/app/common/enum/content generation/content-creation-imagination-level.enum';
import { WizardCreatorUseCase, wizardCreatorUseCaseEnumOptionFields } from '../../enums/wizard-creator-use-case.enum';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';

@Component({
  selector: 'app-wizard-creator-form',
  templateUrl: './wizard-creator-form.component.html',
  styleUrls: ['./wizard-creator-form.component.scss']
})
export class WizardCreatorFormComponent implements OnDestroy, OnInit {


  MAX_AMOUNT_OPTIONS = 3;


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

  wizardDescriptionValidators = [Validators.required, Validators.minLength(10), Validators.maxLength(500)]

  constructor(private _wizardCreatorService: WizardCreatorService, private projectService: BlogProjectsService) {

  }

  ngOnInit(): void {
    this.initContentToneOptions();
    this.initLangEnumOptions();
    this.initCreativityLevelOptions();
    this.initwizardUseCaseOptions()
    this.initVariantsOptions();
    this.initForm();
    this.setListeners();
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
      this._wizardCreatorService.generateContent(formValue).subscribe();
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
  }

  initForm() {
    this.wizardCreatorForm = new FormGroup({
      outputLang: new FormControl('', Validators.required), // Assuming it's a required field
      voiceTone: new FormControl(ContentTone.Informative, Validators.required),  // Defaulting to Informative
      useCase: new FormControl(WizardCreatorUseCase.Email, Validators.required), // Replace DefaultValue with your default or appropriate enum value
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      amountOfVariants: new FormControl(1, [Validators.required, Validators.min(1)]), // Defaulting to 1
      creativityLevel: new FormControl(ContentCreationCreativityLevel.Zen, Validators.required) // Replace DefaultValue with your default or appropriate enum value
    });
  }

  initContentToneOptions() {
    this.contentToneOptions = contentToneOptionFields();
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

}
