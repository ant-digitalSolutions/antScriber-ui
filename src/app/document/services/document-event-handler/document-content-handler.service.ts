import { Injectable } from '@angular/core';
import { DocumentService } from '../document.service';
import { EventsHubService } from 'src/app/events-hub/events-hub.service';
import { EventType } from 'src/app/events-hub/enums/event-type.enum';

@Injectable({
  providedIn: 'root',
})
export class DocumentContentHandlerService {
  constructor(
    private _documentService: DocumentService,
    private _eventHubService: EventsHubService
  ) {}

  setListeners() {
    this._eventHubService.EventEmitter.subscribe(e => {
      if (e.type === EventType.documentSetUpForResponse) {
        this._documentService.setUpDocumentForContent(e.data);
      }
    })
  }
}
