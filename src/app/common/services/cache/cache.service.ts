import { Injectable } from '@angular/core';
import { LocalStorageCacheService } from './local-storage-cache.service';
import { StorageObjectNamesEnum } from '../../enum/storage-objects-name.enum';
import { ICacheService } from './cache-service.interface';

@Injectable()
export class CacheService implements ICacheService {

  constructor(private _cacheStorage: LocalStorageCacheService) { }


  /**
   * Store the wizard data in the local storage.
   *
   * @param {string} useCase
   * @param {*} formData
   * @memberof UserService
   */
  storeWizardForm(formData: any) {
      this._cacheStorage.setData(StorageObjectNamesEnum.WizardFormData, JSON.stringify(formData));
  }

  /**
   * Store the useCase data selected by the user.
   *
   * @param {string} useCase
   * @param {string} useCaseGroup
   * @memberof CacheService
   */
  setUseCaseData(useCase: string, useCaseGroup: string) {
    this._cacheStorage.setData(StorageObjectNamesEnum.WizardUseCase, useCase);
    this._cacheStorage.setData(StorageObjectNamesEnum.WizardGroupCase, useCaseGroup);

    // if a new use case is selected, we remove the data from the previous one
    this.deleteData(StorageObjectNamesEnum.WizardFormData);
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

  deleteData(key: string): void {
    this._cacheStorage.deleteData(key);
  }
  clear(): void {
    this._cacheStorage.clear();
  }
}
