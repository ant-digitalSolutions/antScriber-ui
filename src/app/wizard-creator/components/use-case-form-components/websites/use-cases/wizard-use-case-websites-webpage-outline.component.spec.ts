import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardUseCaseWebsitesWebpageOutlineComponent } from './wizard-use-case-websites-webpage-outline.component';

describe('WizardUseCaseWebsitesWebpageOutlineComponent', () => {
  let component: WizardUseCaseWebsitesWebpageOutlineComponent;
  let fixture: ComponentFixture<WizardUseCaseWebsitesWebpageOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardUseCaseWebsitesWebpageOutlineComponent]
    });
    fixture = TestBed.createComponent(WizardUseCaseWebsitesWebpageOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
