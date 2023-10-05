import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseInternalDevFormComponent } from './wizard-use-case-internal-dev-form.component';

describe('WizardUseCaseInternalDevFormComponent', () => {
  let component: WizardUseCaseInternalDevFormComponent;
  let fixture: ComponentFixture<WizardUseCaseInternalDevFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseInternalDevFormComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseInternalDevFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
