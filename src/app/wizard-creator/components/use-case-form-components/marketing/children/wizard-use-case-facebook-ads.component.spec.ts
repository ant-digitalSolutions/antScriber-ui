import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseFacebookAdsComponent } from './wizard-use-case-facebook-ads.component';

describe('WizardUseCaseFacebookAdsComponent', () => {
  let component: WizardUseCaseFacebookAdsComponent;
  let fixture: ComponentFixture<WizardUseCaseFacebookAdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseFacebookAdsComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseFacebookAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
