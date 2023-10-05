import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { WizardFormService } from '../wizard-form.service';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';
import { WizardCreatorCodingUseCasesEnum } from '../../enums/wizard-creator-coding-use-cases.enum';
import { WizardGeneralWritingUseCases } from '../../enums/wizard-creator-general-writing-use-cases.enum';
import { WizardDefaultFieldNamesEnum } from '../../enums/wizard-default-fields-names.enum';
import { WizardCreatorInternalDevUseCasesEnum } from '../../enums/wizard-creator-internal-dev-use-cases.enum';
import { WizardCreatorMarketingUseCasesEnum } from '../../enums/wizard-creator-marketing-use-cases.enum';

@Injectable()
export class WizardUseCaseService {

  private _wizardUseCaseSubject = new ReplaySubject<string>();
  wizardUseCase$ = this._wizardUseCaseSubject.asObservable();
  _wizardUseCase: string;

  private _wizardUseCaseGroupSubject = new ReplaySubject<string>();
  wizardUseCaseGroup$ = this._wizardUseCaseGroupSubject.asObservable();
  _wizardUseCaseGroup: string;

  constructor(private _wizardFormService: WizardFormService) { }


  setWizardUseCase(v: string) {
    this._wizardUseCaseSubject.next(v);
    this._wizardUseCase = v;
    this.updateWizardFormFields()
  }

  setWizardUseCaseGroup(v: string) {
    this._wizardUseCaseGroupSubject.next(v);
    this._wizardUseCaseGroup = v;
  }

  updateWizardFormFields() {
    switch (this._wizardUseCaseGroup) {
      case WizardCreatorUseCaseGroup.Coding:
        this.updateWizardFormFieldsForGroup_Coding()
        break;
      case WizardCreatorUseCaseGroup.GeneralWriting:
        this.updateWizardFormFieldsForGroup_GeneralWriting();
        break;
      case WizardCreatorUseCaseGroup.InternalDev:
        this.updateWizardFormFieldsForGroup_InternalDev();
        break;

      case WizardCreatorUseCaseGroup.AdsAndMarketing:
        this.updateWizardFormFieldsForGroup_Marketing();
        break;
      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_InternalDev() {
    switch (this._wizardUseCase) {
      case WizardCreatorInternalDevUseCasesEnum.UseCasePromptGenerator:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'del');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.GtpVersion,
          WizardDefaultFieldNamesEnum.ImaginationSelector,
          WizardDefaultFieldNamesEnum.Instruction
        ], 'add');
        break;
      case WizardCreatorInternalDevUseCasesEnum.UseCaseCustomComponent:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'del');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.GtpVersion,
          WizardDefaultFieldNamesEnum.ImaginationSelector
        ], 'add');
        break;

      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_GeneralWriting() {
    switch (this._wizardUseCase) {
      case WizardGeneralWritingUseCases.Message:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.Instruction], 'del');

        break;

      default:
        break;
    }
  }


  updateWizardFormFieldsForGroup_Coding() {
    switch (this._wizardUseCase) {
      case WizardCreatorCodingUseCasesEnum.GithubIssue:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'del');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.GtpVersion,
          WizardDefaultFieldNamesEnum.ImaginationSelector
        ], 'add');
        break;
      case WizardCreatorCodingUseCasesEnum.ImplementFunction:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'del');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.GtpVersion,
          WizardDefaultFieldNamesEnum.ImaginationSelector
        ], 'add');
        break;

      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_Marketing() {
    switch (this._wizardUseCase) {
      case WizardCreatorMarketingUseCasesEnum.GoogleAd:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.Instruction], 'del');
        break;
      case WizardCreatorMarketingUseCasesEnum.FacebookAds:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction, 
          WizardDefaultFieldNamesEnum.AmountOfVariants
        ], 'del');
        break;

      default:
        break;
    }
  }
}
