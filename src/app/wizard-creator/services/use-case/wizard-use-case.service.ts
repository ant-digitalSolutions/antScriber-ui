import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { WizardFormService } from '../wizard-form.service';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';
import { WizardCreatorCodingUseCasesEnum } from '../../enums/wizard-creator-coding-use-cases.enum';
import { WizardGeneralWritingUseCases } from '../../enums/wizard-creator-general-writing-use-cases.enum';
import { WizardDefaultFieldNamesEnum } from '../../enums/wizard-default-fields-names.enum';
import { WizardCreatorInternalDevUseCasesEnum } from '../../enums/wizard-creator-internal-dev-use-cases.enum';

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
        this.updateWizardFormFieldsForGroupCoding()
        break;
    case WizardCreatorUseCaseGroup.GeneralWriting:
      this.updateWizardFormFieldsForGroupGeneralWriting();
      break;
      case WizardCreatorUseCaseGroup.InternalDev:
        this.updateWizardFormFieldsForGroup_InternalDev();
        break;
      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_InternalDev() {
   switch (this._wizardUseCase) {
    case WizardCreatorInternalDevUseCasesEnum.UseCasePromptGenerator:
       this.updateWizardFormFieldsForGroup_InternalDev_PromptGenerator();
      break;
   
    default:
      break;
   }
  }

  updateWizardFormFieldsForGroup_InternalDev_PromptGenerator() {
    this._wizardFormService.updateFormDefaultFieldsToRender(WizardDefaultFieldNamesEnum.ALL, 'del');
    this._wizardFormService.updateFormDefaultFieldsToRender(WizardDefaultFieldNamesEnum.GtpVersion, 'add');
    this._wizardFormService.updateFormDefaultFieldsToRender(WizardDefaultFieldNamesEnum.ImaginationSelector, 'add');
    this._wizardFormService.updateFormDefaultFieldsToRender(WizardDefaultFieldNamesEnum.Instruction, 'add');


  }

  updateWizardFormFieldsForGroupGeneralWriting() {
    switch (this._wizardUseCase) {
      case WizardGeneralWritingUseCases.Message:
        this.updateWizardFormForGeneralWriting_Message()
        break;
    
      default:
        break;
    }
  }
 

  updateWizardFormFieldsForGroupCoding() {
    switch (this._wizardUseCase) {
      case WizardCreatorCodingUseCasesEnum.GithubIssue:
        
        break;
    
      default:
        break;
    }
  }

  updateWizardFormForGeneralWriting_Message() {
    this._wizardFormService.updateFormDefaultFieldsToRender(WizardDefaultFieldNamesEnum.ALL, 'add');
  }
}
