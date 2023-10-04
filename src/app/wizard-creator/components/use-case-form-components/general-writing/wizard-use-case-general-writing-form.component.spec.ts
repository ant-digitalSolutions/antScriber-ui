import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseGeneralWritingFormComponent } from './wizard-use-case-general-writing-form.component';

describe('WizardUseCaseGeneralWritingFormComponent', () => {
  let component: WizardUseCaseGeneralWritingFormComponent;
  let fixture: ComponentFixture<WizardUseCaseGeneralWritingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseGeneralWritingFormComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseGeneralWritingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
