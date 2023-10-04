import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorSelectorFieldComponent } from './wizard-creator-selector-field.component';

describe('WizardCreatorSelectorFieldComponent', () => {
  let component: WizardCreatorSelectorFieldComponent;
  let fixture: ComponentFixture<WizardCreatorSelectorFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorSelectorFieldComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorSelectorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
