import { TestBed } from '@angular/core/testing';

import { MagicEditionService } from './content-magic-edition.service';

describe('ContentMagicEditionService', () => {
  let service: MagicEditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagicEditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
