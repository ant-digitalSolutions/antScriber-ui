import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorHomeComponent } from './wizard-creator-home.component';

describe('WizardCreatorHomeComponent', () => {
  let component: WizardCreatorHomeComponent;
  let fixture: ComponentFixture<WizardCreatorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorHomeComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
