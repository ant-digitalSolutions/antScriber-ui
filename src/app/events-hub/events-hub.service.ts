import { Injectable } from '@angular/core';
import { EventData } from './event-data';
import { Observable, Subject } from 'rxjs';
import { EventType } from './enums/event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EventsHubService {

  private _eventEmitter = new Subject<EventData>();

  emit(eventType: EventType, data?: any): void {
    this._eventEmitter.next({
      type: eventType,
      data: data,
    });
  }

  public get EventEmitter(): Observable<EventData> {
    return this._eventEmitter.asObservable();
  }
}
