import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseMarketingComponent } from './wizard-use-case-marketing.component';

describe('WizardUseCaseMarketingComponent', () => {
  let component: WizardUseCaseMarketingComponent;
  let fixture: ComponentFixture<WizardUseCaseMarketingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseMarketingComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
