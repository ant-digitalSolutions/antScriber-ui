import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorFormComponent } from './wizard-creator-form.component';

describe('WizardCreatorFormComponent', () => {
  let component: WizardCreatorFormComponent;
  let fixture: ComponentFixture<WizardCreatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorFormComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
