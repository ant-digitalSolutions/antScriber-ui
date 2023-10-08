import { Injectable } from '@angular/core';
import { ICacheService } from './cache-service.interface';

@Injectable()
export class LocalStorageCacheService implements ICacheService {
  getData(dataKey: string) {
    const data = localStorage.getItem(dataKey);
    return data;
  }

  setData(key: string, data: string): boolean {
    try {
       localStorage.setItem(key, data);
       return true;
    } catch (error) {
      console.error('Error saving data into the local-storage cache');
      return false;
    }
  }

  deleteData(key: string): void {
   localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
