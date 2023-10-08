import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { mapEnumNameAndValue } from 'src/app/common/functions/name-and-values-of-enum.function';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';
import { WizardGeneralWritingUseCases } from '../../enums/wizard-creator-general-writing-use-cases.enum';
import { WizardSocialMediaUseCases } from '../../enums/wizard-creator-social-media-use-cases.enum';
import { WizardBlogAndArticlesUseCases } from '../../enums/wizard-creator-blog-and-articles-use-cases.enum';
import { WizardCreatorEcommerceUseCasesEnum } from '../../enums/wizard-creator-ecommerce-use-cases.enum';
import { WizardCreatorMarketingUseCasesEnum } from '../../enums/wizard-creator-marketing-use-cases.enum';
import { WizardCreatorCodingUseCasesEnum } from '../../enums/wizard-creator-coding-use-cases.enum';
import { WizardCreatorInternalDevUseCasesEnum } from '../../enums/wizard-creator-internal-dev-use-cases.enum';
import { WizardCreatorLearningUseCasesEnum } from '../../enums/wizard-creator-learning-use-cases.enum';
import { WizardFormService } from '../../services/wizard-form.service';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';
import { ActivatedRoute } from '@angular/router';
import { QueryParamNames } from 'src/app/common/enum/query-params-names.enum';
import { CacheService } from 'src/app/common/services/cache/cache.service';

@Component({
  selector: 'app-wizard-use-cases-selector-home',
  templateUrl: './wizard-use-cases-selector-home.component.html',
  styleUrls: ['./wizard-use-cases-selector-home.component.scss']
})
export class WizardUseCasesSelectorHomeComponent implements OnInit, OnDestroy {


  showUseCases = true;


  /**
   * Indicate if the use group in the index `i` is open or closed
   *
   * @type {boolean[]}
   * @memberof WizardUseCasesSelectorHomeComponent
   */
  groupState: boolean[] = [];

  componentDestroyed$: Subject<boolean> = new Subject();

  useCasesGroups: OptionField<WizardCreatorUseCaseGroup>[];

  selectGroupUseCases: OptionField<string>[];

  selectedCase = 'Select the Use Case';

  showLoadMoreUseCasesBtn = true;

  selectedUseCaseGroup = '';

  constructor(
    private _wizardForm: WizardFormService,
    private _useCaseService: WizardUseCaseService,
    private _activeRoute: ActivatedRoute,
    private _cacheService: CacheService) {
  }

  ngOnInit(): void {
    this.setListeners()
    this.setUseCaseFromParams();
    this.setInitialGroupOptions(true);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._useCaseService.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$)).subscribe(useCase => {
      if (useCase) {
        this.selectedCase = useCase;
        this.showUseCases = false;
        this.selectedUseCaseGroup = '';
      }
    })
  }

  setUseCases(initialElements: boolean = true) {
   this.setInitialGroupOptions(initialElements)

    if (!initialElements) {
      this.showLoadMoreUseCasesBtn = false;
    }

    this.showUseCases = true;

    if (initialElements)
      this.selectUseCaseGroup(this.useCasesGroups[0].value);
  }



  selectUseCaseGroup(selectedGroup: string) {
    this._useCaseService.setWizardUseCaseGroup(selectedGroup);
    this._wizardForm.updateAdditionalData('useCaseGroup', selectedGroup);
    
    switch (selectedGroup) {
      case WizardCreatorUseCaseGroup.GeneralWriting:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardGeneralWritingUseCases);
        break;
      case WizardCreatorUseCaseGroup.SocialMedia:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardSocialMediaUseCases);
        break;
      case WizardCreatorUseCaseGroup.ArticlesAndBlog:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardBlogAndArticlesUseCases);
        break;
      case WizardCreatorUseCaseGroup.Ecommerce:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorEcommerceUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.AdsAndMarketing:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorMarketingUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.Coding:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorCodingUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.InternalDev:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorInternalDevUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.Learning:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorLearningUseCasesEnum);
        break;

      default:
        break;
    }

    this.selectedUseCaseGroup = selectedGroup;
  }

  toggleUseCases() {
    this.showUseCases = !this.showUseCases;
  }

  /**
 * This function sets the use case and use case group based on the query parameters.
 * It also retrieves the latest form data from the cache if both use case and use case group are present in the query parameters,
 * otherwise it retrieves the wizard data from the storage.
 */
  setUseCaseFromParams() {
    const queryParams = this._activeRoute.snapshot.queryParams;
    let hasUseCase = false;
    let hasUseCaseGroup = false;

    if (queryParams[QueryParamNames.UseCageGroup]) {
      // Select the use case group from the query parameters
      this.selectUseCaseGroup(queryParams[QueryParamNames.UseCageGroup])
      hasUseCaseGroup = true;
    }
    if (queryParams[QueryParamNames.UseCase]) {
      // Set the wizard use case from the query parameters
      this._useCaseService.setWizardUseCase(queryParams[QueryParamNames.UseCase])
      hasUseCase = true;
    }

    if (hasUseCase && hasUseCaseGroup) {
      // Get the latest form data from the cache and set it in the wizard form
      const latestFormData = this._cacheService.getWizardDataByUseCase(queryParams[QueryParamNames.UseCase], queryParams[QueryParamNames.UseCageGroup]);
      if (latestFormData) {
        this._wizardForm.setWizardFormData(latestFormData);
      }
    } else {
      // If the user doesn't have the use case in the query parameters, try to get them from the cache
      this.setWizardDataFromStorage();
    }
  }

  /**
   * Get the useCase and useCase group from the cache.
   * 
   * If the data is available, also set the formData.
   *
   * @memberof WizardUseCasesSelectorHomeComponent
   */
  setWizardDataFromStorage() {
    const useCaseData = this._cacheService.getLatestWizardUseCase();

    if (useCaseData) {
      this.selectUseCaseGroup(useCaseData.useCaseGroup);
      this._useCaseService.setWizardUseCase(useCaseData.useCase);

      // if the cache contains the latest data for this use case, set the form data
      const latestFormData = this._cacheService.getWizardDataByUseCase(useCaseData.useCase, useCaseData.useCaseGroup);
      if (latestFormData) {
        this._wizardForm.setWizardFormData(latestFormData);
      }
    } else { // if don't have data in the queryParams of the cache, then set the default values
      this.setUseCases()
    }

  
  }

  /**
   * Set the values for the use case group options
   *
   * @private
   * @memberof WizardUseCasesSelectorHomeComponent
   */
  private setInitialGroupOptions(initialValues: boolean): void {
    const values = mapEnumNameAndValue(WizardCreatorUseCaseGroup);
    this.useCasesGroups = initialValues ? values.slice(0, 3) : values;
  }
}
