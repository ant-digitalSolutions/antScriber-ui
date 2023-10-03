import { TestBed } from '@angular/core/testing';

import { WizardFormService } from './wizard-form.service';

describe('WizardFormService', () => {
  let service: WizardFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
