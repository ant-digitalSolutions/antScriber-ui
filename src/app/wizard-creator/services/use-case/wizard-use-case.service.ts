import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
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
import { useCaseMeta_GeneralWriting } from '../../data/use-cases/use-cases-general-writing.data';
import { useCaseMeta_Marketing } from '../../data/use-cases/use-cases-marketing.data';
import { useCaseMeta_Social } from '../../data/use-cases/use-cases-social.data';
import { useCaseMeta_Coding } from '../../data/use-cases/use-cases-general-coding.data';
import { useCaseMeta_Internal } from '../../data/use-cases/use-cases-general-internal.data';
import { useCaseMeta_Learning } from '../../data/use-cases/use-cases-general-learning.data';
import { WizardCreatorWebsiteUseCasesEnum } from '../../enums/wizard-creator-website-use-cases.enum';
import { useCaseMeta_Websites } from '../../data/use-cases/use-cases-general-websites.data';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Location } from '@angular/common';
import { UseCaseMetaAbstract } from '../../use-case-meta/use-case-meta.abastract';
import { useCaseIndex } from '../../use-case-meta/use-case-register';
import { UseCaseHandle as UseCaseMetaHandle } from '../../use-case-meta/use-case-handle';

@Injectable()
export class WizardUseCaseService {

  private _wizardUseCaseSubject = new ReplaySubject<string>();
  wizardUseCase$ = this._wizardUseCaseSubject.asObservable();
  _wizardUseCase: string;

  private _wizardUseCaseGroupSubject = new ReplaySubject<string>();
  wizardUseCaseGroup$ = this._wizardUseCaseGroupSubject.asObservable();
  _wizardUseCaseGroup: string;

  // emits when the use case selector should be closed.
  // Right now it will emit after a click outside the selector area
  private _closeSelectorSubject = new Subject<void>();
  closeSelectorEvent$ = this._closeSelectorSubject.asObservable();

  // indicate the user is seeing the use cases selector
  showingUseCasesSelector: boolean = false;

  // The value of the latest use case group selected by the user.
  // At this point, the user hasn't selected a use case yet.
  useCaseGroupOpened: string;


  _useCaseMetaHandle: UseCaseMetaHandle;


  constructor(
    private _wizardFormService: WizardFormService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _cacheService: CacheService,
    protected $gaService: GoogleAnalyticsService) {

    this._useCaseMetaHandle = new UseCaseMetaHandle();
  }




  /**
   * When the user selects a use case, run some logic
   *
   * @param {string} v
   * @memberof WizardUseCaseService
   */
  setWizardUseCase(v: string) {
    this.setWizardUseCaseGroup(this.useCaseGroupOpened);
    this._wizardUseCaseSubject.next(v);
    this._wizardUseCase = v;
    // this.updateWizardFormFields();
    this.updateQueryParamsWithUseCase(v);
    this._wizardFormService.updateAdditionalData('useCase', v);

    this._useCaseMetaHandle.initUseCaseFields(this._wizardFormService, this.useCaseGroupOpened, v);

    // log GA
    // this.$gaService.pageView(`/wizard/${this._wizardUseCaseGroup}/${v}`,
    //   'Wizard_Creator',
    //   window.location.href
    // );

    this.$gaService.event('wizard_use_case_selection', this._wizardUseCaseGroup, v, 1, true);

    // this._cacheService.setUseCaseData(v, this._wizardUseCaseGroup);
  }

  setWizardUseCaseGroup(v: string) {
    this._wizardUseCaseGroupSubject.next(v);
    this._wizardUseCaseGroup = v;
    this._wizardFormService.updateAdditionalData('useCaseGroup', v);

  }

  updateWizardFormFields() {
    switch (this._wizardUseCaseGroup) {
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
      case WizardCreatorWebsiteUseCasesEnum.SEO:
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
          WizardDefaultFieldNamesEnum.Instruction, WizardDefaultFieldNamesEnum.VoiceTone], 'del');
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

  /**
 * Return the list of use cases that belongs to the given group.
 * 
 * It returns the meta_class that represents the use case.
 *
 * @param {string} useCaseGroup
 * @return {*}  {UseCaseMetaAbstract[]}
 * @memberof UseCaseHandle
 */
  listUseCasesByGroup(useCaseGroup: string): UseCaseMetaAbstract[] {
    return this._useCaseMetaHandle.listUseCasesByGroup(useCaseGroup);
  }


  /**
   * Return the list of available use case groups.
   *
   * @readonly
   * @type {string[]}
   * @memberof WizardUseCaseService
   */
  public get listUseCaseGroups(): string[] {
    return this._useCaseMetaHandle.useCaseGroups;
  }


  closeSelector(): void {
    this._closeSelectorSubject.next();
  }


  public get showGenerateBtn(): boolean {
    return !this.showingUseCasesSelector;
  }


  public get selectedUseCaseGroup(): string {
    return this._wizardUseCaseGroup;
  }
}
