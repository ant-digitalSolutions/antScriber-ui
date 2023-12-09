import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { WizardFormService } from '../wizard-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamNames } from 'src/app/common/enum/query-params-names.enum';
import { CacheService } from 'src/app/common/services/cache/cache.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { UseCaseMetaAbstract } from '../../use-case-meta/use-case-meta.abastract';
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
  showingUseCasesSelector: boolean = true;

  // The value of the latest use case group selected by the user.
  // At this point, the user hasn't selected a use case yet.
  useCaseGroupOpened: string;

  constructor(
    private _wizardFormService: WizardFormService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _cacheService: CacheService,
    protected $gaService: GoogleAnalyticsService,
    private _useCaseMetaHandle: UseCaseMetaHandle) {

  }




  /**
   * When the user selects a use case, run some logic
   *
   * @param {string} v
   * @memberof WizardUseCaseService
   */
  setWizardUseCase(v: string) {
    // destroy the listeners of the current use case.
    if (this._wizardUseCaseGroup && this._wizardUseCase) {
      this._useCaseMetaHandle.destroyUseCase(this._wizardUseCaseGroup, this._wizardUseCase);
    }

    // init use case data
    this._useCaseMetaHandle.initUseCaseFields(this._wizardFormService, this.useCaseGroupOpened, v);


    this.setWizardUseCaseGroup(this.useCaseGroupOpened);
    this._wizardUseCaseSubject.next(v);
    this._wizardUseCase = v;
    this.updateRouteParams(v);
    this._wizardFormService.updateAdditionalData('useCase', v);

    this.$gaService.event('wizard_use_case_selection', this._wizardUseCaseGroup, v, 1, true);
  }

  setWizardUseCaseGroup(v: string) {
    this._wizardUseCaseGroupSubject.next(v);
    this._wizardUseCaseGroup = v;
    this._wizardFormService.updateAdditionalData('useCaseGroup', v);

  }

  updateRouteParams(useCase: string) {
    this._router.navigate([`/wizard/creator/ucg/${this._wizardUseCaseGroup}/uc/${useCase}`], {
      relativeTo: this._activeRoute,
      queryParams: this._activeRoute.snapshot.queryParams
    })
  } 

  handleUseCaseCache(useCase: string, useCaseGroup: string) {
    this._cacheService.setUseCaseData(useCase, this._wizardUseCaseGroup)

    const latestFormData = this._cacheService.getWizardDataByUseCase(useCase, useCaseGroup);
    if (latestFormData) {
      this._wizardFormService.setWizardFormData(latestFormData);
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
