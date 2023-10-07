import { Injectable } from '@angular/core';
import { LocalStorageCacheService } from './local-storage-cache.service';
import { StorageObjectNamesEnum } from '../../enum/storage-objects-name.enum';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private _cacheStorage: LocalStorageCacheService) { }

  /**
   * Store the wizard data in the local storage.
   *
   * @param {string} useCase
   * @param {*} formData
   * @memberof UserService
   */
  storeWizardForm(useCase: string, useCaseGroup: string, formData: any) {

    this._cacheStorage.setData(StorageObjectNamesEnum.WizardUseCase, useCase);
    this._cacheStorage.setData(StorageObjectNamesEnum.WizardGroupCase, useCaseGroup);
    this._cacheStorage.setData(StorageObjectNamesEnum.WizardFormData, JSON.stringify(formData));
  }

  /**
   * Get the latest data of the wizard form
   *
   * @param {string} useCase
   * @return {*} 
   * @memberof CacheService
   */
  getWizardForm() {
    return this._cacheStorage.getData(StorageObjectNamesEnum.WizardFormData);
  }

  /**
   * Retrieve the data of the latest useCase and caseGroup
   * used by the user. Return null if no data.
   *
   * @return {*}  {({ useCase: string, useCaseGroup: string } | null)}
   * @memberof CacheService
   */
  getLatestWizardUseCase(): { useCase: string, useCaseGroup: string } | null {
    const useCase = this._cacheStorage.getData(StorageObjectNamesEnum.WizardUseCase);
    const useCaseGroup = this._cacheStorage.getData(StorageObjectNamesEnum.WizardGroupCase);

    return useCase && useCaseGroup ? {
      useCase,
      useCaseGroup
    } : null;
  }

  /**
   * Retrieve data from the local-storage
   *
   * @param {string} dataKey
   * @return {*} 
   * @memberof UserService
   */
  getData(dataKey: string) {
    return this._cacheStorage.getData(dataKey)
  }

  setData(key: string, data: any): boolean {
    return this._cacheStorage.setData(key, data);
  }
}
