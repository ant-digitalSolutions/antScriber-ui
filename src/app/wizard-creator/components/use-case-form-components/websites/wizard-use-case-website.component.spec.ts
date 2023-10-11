import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseWebsiteComponent } from './wizard-use-case-website.component';

describe('WizardUseCaseWebsiteComponent', () => {
  let component: WizardUseCaseWebsiteComponent;
  let fixture: ComponentFixture<WizardUseCaseWebsiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseWebsiteComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
