import { TestBed } from '@angular/core/testing';

import { WizardUseCaseService } from './wizard-use-case.service';

describe('WizardUseCaseService', () => {
  let service: WizardUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
