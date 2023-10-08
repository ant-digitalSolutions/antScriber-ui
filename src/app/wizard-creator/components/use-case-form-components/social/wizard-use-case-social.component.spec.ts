import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseSocialComponent } from './wizard-use-case-social.component';

describe('WizardUseCaseSocialComponent', () => {
  let component: WizardUseCaseSocialComponent;
  let fixture: ComponentFixture<WizardUseCaseSocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseSocialComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
