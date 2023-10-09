import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseSocialTweetComponent } from './wizard-use-case-social-tweet.component';

describe('WizardUseCaseSocialTweetComponent', () => {
  let component: WizardUseCaseSocialTweetComponent;
  let fixture: ComponentFixture<WizardUseCaseSocialTweetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseSocialTweetComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseSocialTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
