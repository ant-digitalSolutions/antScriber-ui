import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseCodingHomeComponent } from './wizard-use-case-coding-home.component';

describe('WizardUseCaseCodingHomeComponent', () => {
  let component: WizardUseCaseCodingHomeComponent;
  let fixture: ComponentFixture<WizardUseCaseCodingHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseCodingHomeComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseCodingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
