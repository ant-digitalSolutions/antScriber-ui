import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorTextFieldComponent } from './wizard-creator-text-field.component';

describe('WizardCreatorTextFieldComponent', () => {
  let component: WizardCreatorTextFieldComponent;
  let fixture: ComponentFixture<WizardCreatorTextFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorTextFieldComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
