import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorButtonToggleComponent } from './wizard-creator-button-toggle.component';

describe('WizardCreatorButtonToggleComponent', () => {
  let component: WizardCreatorButtonToggleComponent;
  let fixture: ComponentFixture<WizardCreatorButtonToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorButtonToggleComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
