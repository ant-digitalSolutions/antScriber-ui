import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCasesSelectorByGroupComponent } from './wizard-use-cases-selector-by-group.component';

describe('WizardUseCasesSelectorByGroupComponent', () => {
  let component: WizardUseCasesSelectorByGroupComponent;
  let fixture: ComponentFixture<WizardUseCasesSelectorByGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCasesSelectorByGroupComponent]
    });
    fixture = TestBed.createComponent(WizardUseCasesSelectorByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
