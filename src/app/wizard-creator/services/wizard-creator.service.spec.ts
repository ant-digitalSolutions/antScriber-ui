import { TestBed } from '@angular/core/testing';

import { WizardCreatorService } from './wizard-creator.service';

describe('WizardCreatorService', () => {
  let service: WizardCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
