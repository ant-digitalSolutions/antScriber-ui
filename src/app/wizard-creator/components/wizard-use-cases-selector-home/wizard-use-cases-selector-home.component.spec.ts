import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCasesSelectorHomeComponent } from './wizard-use-cases-selector-home.component';

describe('WizardUseCasesSelectorHomeComponent', () => {
  let component: WizardUseCasesSelectorHomeComponent;
  let fixture: ComponentFixture<WizardUseCasesSelectorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCasesSelectorHomeComponent]
    });
    fixture = TestBed.createComponent(WizardUseCasesSelectorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
