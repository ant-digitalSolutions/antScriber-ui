import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  // emit when the app is loading and finish the logic
  _loadingSubject = new Subject<boolean>();
  loadingEvent$ = this._loadingSubject.asObservable();

  constructor() { }
}
