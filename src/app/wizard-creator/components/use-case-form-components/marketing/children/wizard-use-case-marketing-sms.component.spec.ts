import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseMarketingSmsComponent } from './wizard-use-case-marketing-sms.component';

describe('WizardUseCaseMarketingSmsComponent', () => {
  let component: WizardUseCaseMarketingSmsComponent;
  let fixture: ComponentFixture<WizardUseCaseMarketingSmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseMarketingSmsComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseMarketingSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
