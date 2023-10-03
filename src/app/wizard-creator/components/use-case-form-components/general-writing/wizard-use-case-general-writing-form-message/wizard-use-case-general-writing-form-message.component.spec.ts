import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseGeneralWritingFormMessageComponent } from './wizard-use-case-general-writing-form-message.component';

describe('WizardUseCaseGeneralWritingFormMessageComponent', () => {
  let component: WizardUseCaseGeneralWritingFormMessageComponent;
  let fixture: ComponentFixture<WizardUseCaseGeneralWritingFormMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseGeneralWritingFormMessageComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseGeneralWritingFormMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
