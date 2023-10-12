import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { WizardFormService } from '../wizard-form.service';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';
import { WizardCreatorCodingUseCasesEnum } from '../../enums/wizard-creator-coding-use-cases.enum';
import { WizardGeneralWritingUseCases } from '../../enums/wizard-creator-general-writing-use-cases.enum';
import { WizardDefaultFieldNamesEnum } from '../../enums/wizard-default-fields-names.enum';
import { WizardCreatorInternalDevUseCasesEnum } from '../../enums/wizard-creator-internal-dev-use-cases.enum';
import { WizardCreatorMarketingUseCasesEnum } from '../../enums/wizard-creator-marketing-use-cases.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamNames } from 'src/app/common/enum/query-params-names.enum';
import { WizardCreatorLearningUseCasesEnum } from '../../enums/wizard-creator-learning-use-cases.enum';
import { CacheService } from 'src/app/common/services/cache/cache.service';
import { WizardSocialMediaUseCases } from '../../enums/wizard-creator-social-media-use-cases.enum';
import { UseCaseMeta } from '../../interfaces/use-case-meta.interface';
import {  useCaseMeta_GeneralWriting } from '../../data/use-cases/use-cases-general-writing.data';
import { useCaseMeta_Marketing } from '../../data/use-cases/use-cases-marketing.data';
import { useCaseMeta_Social } from '../../data/use-cases/use-cases-social.data';
import { useCaseMeta_Coding } from '../../data/use-cases/use-cases-general-coding.data';
import { useCaseMeta_Internal } from '../../data/use-cases/use-cases-general-internal.data';
import { useCaseMeta_Learning } from '../../data/use-cases/use-cases-general-learning.data';
import { WizardCreatorWebsiteUseCasesEnum } from '../../enums/wizard-creator-website-use-cases.enum';
import { useCaseMeta_Websites } from '../../data/use-cases/use-cases-general-websites.data';

@Injectable()
export class WizardUseCaseService {

  private _wizardUseCaseSubject = new ReplaySubject<string>();
  wizardUseCase$ = this._wizardUseCaseSubject.asObservable();
  _wizardUseCase: string;

  private _wizardUseCaseGroupSubject = new ReplaySubject<string>();
  wizardUseCaseGroup$ = this._wizardUseCaseGroupSubject.asObservable();
  _wizardUseCaseGroup: string;

  constructor(
    private _wizardFormService: WizardFormService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _cacheService: CacheService) { }


  setWizardUseCase(v: string) {
    this._wizardUseCaseSubject.next(v);
    this._wizardUseCase = v;
    this.updateWizardFormFields();
    this.updateQueryParamsWithUseCase(v);
    this._wizardFormService.updateAdditionalData('useCase', v);

    // this._cacheService.setUseCaseData(v, this._wizardUseCaseGroup);
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
      case WizardCreatorUseCaseGroup.Learning:
        this.updateWizardFormFieldsForGroup_Learning();
        break;
      case WizardCreatorUseCaseGroup.SocialMedia:
        this.updateWizardFormFieldsForGroup_Social();
        break;
      case WizardCreatorUseCaseGroup.WebsiteCopy:
        this.updateWizardFormFieldsForGroup_Website();
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
      case WizardCreatorMarketingUseCasesEnum.EmailMarketing:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction,
          WizardDefaultFieldNamesEnum.AmountOfVariants
        ], 'del');
        break;
      case WizardCreatorMarketingUseCasesEnum.SmsMarketing:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction
        ], 'del');
        break;

      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_Learning() {
    switch (this._wizardUseCase) {
      case WizardCreatorLearningUseCasesEnum.HowTo:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'del');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.GtpVersion, 
          WizardDefaultFieldNamesEnum.ImaginationSelector, 
          WizardDefaultFieldNamesEnum.Instruction, 
          WizardDefaultFieldNamesEnum.OutputLang], 'add');

        break;
      case WizardCreatorLearningUseCasesEnum.Explain:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'del');
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.GtpVersion, WizardDefaultFieldNamesEnum.ImaginationSelector, WizardDefaultFieldNamesEnum.Instruction], 'add');

        break;

      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_Social() {
    switch (this._wizardUseCase) {
      case WizardSocialMediaUseCases.InstagramCaption:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction], 'del');
        break;
      case WizardSocialMediaUseCases.FacebookPost:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction], 'del');
        break;
      case WizardSocialMediaUseCases.LinkedinPost:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction], 'del');
        break;

      case WizardSocialMediaUseCases.TwitterThread:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction, WizardDefaultFieldNamesEnum.AmountOfVariants], 'del');
        break;

      default:
        break;
    }
  }

  updateWizardFormFieldsForGroup_Website() {
    switch (this._wizardUseCase) {
      case WizardCreatorWebsiteUseCasesEnum.WebpageSectionCopy:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction, WizardDefaultFieldNamesEnum.AmountOfVariants], 'del');
        break;
      case WizardCreatorWebsiteUseCasesEnum.WebpageOutline:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction, WizardDefaultFieldNamesEnum.AmountOfVariants, WizardDefaultFieldNamesEnum.VoiceTone], 'del');
        break;
      default:
        break;
    }
  }

  updateQueryParamsWithUseCase(useCase: string) {
    const queryParams = {
      ...this._activeRoute.snapshot.queryParams
      };

    queryParams[QueryParamNames.UseCase] = useCase;
    queryParams[QueryParamNames.UseCageGroup] = this._wizardUseCaseGroup;

    this.handleUseCaseCache(useCase, this._wizardUseCaseGroup)

    this._router.navigate([], {
      relativeTo: this._activeRoute,
      queryParams,
      replaceUrl: true,
    });
  }

  handleUseCaseCache(useCase: string, useCaseGroup: string) {
    this._cacheService.setUseCaseData(useCase, this._wizardUseCaseGroup)
    
    const latestFormData = this._cacheService.getWizardDataByUseCase(useCase, useCaseGroup);
    if (latestFormData) {
      this._wizardFormService.setWizardFormData(latestFormData);
    }
  }

  /**
   * Return the meta-data of the given useCase.
   * 
   *  TODO: Improve this implementation by using hashtables
   *
   * @param {string} useCase
   * @return {*}  {UseCaseMeta}
   * @memberof WizardUseCaseService
   */
  useCaseMetaData(useCase: string): UseCaseMeta {
    const metaDataList = [
      ...useCaseMeta_GeneralWriting, 
      ...useCaseMeta_Marketing, 
      ...useCaseMeta_Social, 
      ...useCaseMeta_Coding,
      ...useCaseMeta_Internal,
      ...useCaseMeta_Learning,
      ...useCaseMeta_Websites];

    const index = metaDataList.findIndex(m => m.useCaseName === useCase);
    if (index >= 0) {
      return metaDataList[index];
    }
    else {
      return {
        iconName: 'default',
        isAvailableForFreeUsers: false,
        useCaseName: 'default'
      }
    }
  }




}
