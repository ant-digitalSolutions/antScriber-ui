import { TestBed } from '@angular/core/testing';

import { DocumentContentHandlerService } from './document-content-handler.service';

describe('DocumentContentHandlerService', () => {
  let service: DocumentContentHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentContentHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
