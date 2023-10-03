import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorCheckboxFieldComponent } from './wizard-creator-checkbox-field.component';

describe('WizardCreatorCheckboxFieldComponent', () => {
  let component: WizardCreatorCheckboxFieldComponent;
  let fixture: ComponentFixture<WizardCreatorCheckboxFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorCheckboxFieldComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorCheckboxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
