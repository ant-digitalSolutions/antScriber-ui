import { TestBed } from '@angular/core/testing';

import { WebpageSectionService } from './webpage-section.service';

describe('WebpageSectionService', () => {
  let service: WebpageSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebpageSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
