import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseCodingImplementCodeComponent } from './wizard-use-case-coding-implement-code.component';

describe('WizardUseCaseCodingImplementCodeComponent', () => {
  let component: WizardUseCaseCodingImplementCodeComponent;
  let fixture: ComponentFixture<WizardUseCaseCodingImplementCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseCodingImplementCodeComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseCodingImplementCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
