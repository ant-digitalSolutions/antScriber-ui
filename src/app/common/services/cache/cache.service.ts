import { Injectable } from '@angular/core';
import { LocalStorageCacheService } from './local-storage-cache.service';
import { StorageObjectNamesEnum } from '../../enum/storage-objects-name.enum';
import { ICacheService } from './cache-service.interface';

@Injectable()
export class CacheService implements ICacheService {

  constructor(private _cacheStorage: LocalStorageCacheService) { }

  // updateWizardFormData(fieldName: string, fieldValue: any) {
  //   const currentUseCaseData = this.getLatestWizardUseCase();
  //   if (currentUseCaseData) { 
  //     const key = this.useCaseFormKey(currentUseCaseData!.useCase, currentUseCaseData!.useCase); 

  //   }
  // }

  updateWizardFormData(formData: any) {
    const currentUseCaseData = this.getLatestWizardUseCase();
    if (!currentUseCaseData) {
      return;
    }
  
    this.storeFormDataByUseCase(currentUseCaseData!.useCase, currentUseCaseData!.useCaseGroup, formData)
  }

  /**
   * Store or update the wizard form data to the cache.
   *
   * @param {string} useCase Selected use case.
   * @param {string} useCaseGroup selected use case group.
   * @param {*} formData The data of the current Wizard form.
   * @return {*}  {void}
   * @memberof CacheService
   */
  storeFormDataByUseCase(useCase: string, useCaseGroup: string, formData: any): void {
    const key = this.useCaseFormKey(useCase, useCaseGroup);
    const dataString = this.getData(key);

    // if the cache contains data for the selected use case, update it
    if (dataString) {
      const formDataCache = JSON.parse(dataString);
      this.updateCacheFormData(formData, formDataCache);
      this.setData(key, JSON.stringify(formDataCache));
      return;
    }
    else { // if not, then store the new form data.
      this.setData(key, JSON.stringify(formData));
    }
  }

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

  getWizardDataByUseCase(useCase: string, useCaseGroup: string) {
    const data = this.getData(this.useCaseFormKey(useCase, useCaseGroup));
    if (data) {
      return JSON.parse(data);
    }
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

  setData(key: string, data: string): boolean {
    return this._cacheStorage.setData(key, data);
  }

  deleteData(key: string): void {
    this._cacheStorage.deleteData(key);
  }
  clear(): void {
    this._cacheStorage.clear();
  }

  private useCaseFormKey(useCase: string, useCaseGroup: string): string {
    return `${useCaseGroup}_${useCase}`;
  }

  private updateCacheFormData(newFormData: any, formDataFromCache: any) {
    Object.keys(newFormData).forEach(fieldName => {
      const value = newFormData[fieldName];

      formDataFromCache[fieldName] = value;
    });
  }
}
