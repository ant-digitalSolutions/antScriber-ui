import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseSocialLinkedinComponent } from './wizard-use-case-social-linkedin.component';

describe('WizardUseCaseSocialLinkedinComponent', () => {
  let component: WizardUseCaseSocialLinkedinComponent;
  let fixture: ComponentFixture<WizardUseCaseSocialLinkedinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseSocialLinkedinComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseSocialLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
