import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { QueryParamNames } from 'src/app/common/enum/query-params-names.enum';
import { CacheService } from 'src/app/common/services/cache/cache.service';
import { UserInitializationWalkthroughTourStepsEnum } from 'src/app/walkthrough-tours/enums/walkthrough-tour-user-initialization-steps-id.enum';
import { UserInitTourService } from 'src/app/walkthrough-tours/user-init-tour.service';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';
import { WizardFormService } from '../../services/wizard-form.service';
import { IUseCaseMeta } from '../../use-case-meta/use-case-meta.interface';

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

  useCasesGroups: string[];

  selectGroupUseCases: IUseCaseMeta[];

  selectedCase = 'Select the Use Case';

  showLoadMoreUseCasesBtn = true;

  selectedUseCaseGroup = '';

  constructor(
    private _wizardForm: WizardFormService,
    private _useCaseService: WizardUseCaseService,
    private _activeRoute: ActivatedRoute,
    private _cacheService: CacheService,
    private _userInitTour: UserInitTourService) {
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
        this._useCaseService.showingUseCasesSelector = false;
      }
    })

    this._useCaseService.closeSelectorEvent$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        if (this.showUseCases)
          this.toggleUseCases();

        // reset the current group
        this.selectedUseCaseGroup = this._useCaseService.selectedUseCaseGroup;
      });

    this._userInitTour.walkthroughTouStepShowEvent$.pipe(takeUntil(this.componentDestroyed$), takeUntil(this._userInitTour.walkthroughTourEnded$))
      .subscribe(stepId => {
        if (stepId === UserInitializationWalkthroughTourStepsEnum.SelectSpecificTask) {
          this.selectUseCaseGroup(WizardCreatorUseCaseGroup.SocialMedia);
        }
      })
  }

  setUseCases(initialElements: boolean = true) {
    this.setInitialGroupOptions(initialElements)

    this.showUseCases = true;

    if (initialElements)
      this.selectUseCaseGroup(this.useCasesGroups[0]);
  }



  selectUseCaseGroup(selectedGroup: string) {
    this._useCaseService.useCaseGroupOpened = selectedGroup;
    this.selectedUseCaseGroup = selectedGroup;

    this.selectGroupUseCases = this._useCaseService.listUseCasesByGroup(selectedGroup);
    this.selectedUseCaseGroup = selectedGroup;
  }

  toggleUseCases() {
    this.showUseCases = !this.showUseCases;
    this._useCaseService.showingUseCasesSelector = this.showUseCases;
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
      // this.setWizardDataFromStorage();
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
    const useCaseGroups = this._useCaseService.listUseCaseGroups;


    if (window.location.href.indexOf('app.') >= 0) {
      const internalDevIndex = useCaseGroups.findIndex(g => g === WizardCreatorUseCaseGroup.InternalDev);

      if (internalDevIndex >= 0)
        useCaseGroups.splice(internalDevIndex, 1);
    }

    const GROUPS_TO_SHOW = 3;

    let selectedGroupIndex = -1;
    if (this.selectedUseCaseGroup) {
      selectedGroupIndex = useCaseGroups.findIndex(g => g === this.selectedUseCaseGroup)
    }

    if (initialValues && selectedGroupIndex < GROUPS_TO_SHOW) {
      this.useCasesGroups = useCaseGroups.slice(0, GROUPS_TO_SHOW);
      this.showLoadMoreUseCasesBtn = true;
    } else {
      this.useCasesGroups = useCaseGroups;
      this.showLoadMoreUseCasesBtn = false;
    }
    this.useCasesGroups = initialValues && selectedGroupIndex < GROUPS_TO_SHOW ? useCaseGroups.slice(0, GROUPS_TO_SHOW) : useCaseGroups;
  }
}
