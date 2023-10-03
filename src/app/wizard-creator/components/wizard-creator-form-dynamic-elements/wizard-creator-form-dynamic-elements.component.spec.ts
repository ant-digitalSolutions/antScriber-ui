import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorFormDynamicElementsComponent } from './wizard-creator-form-dynamic-elements.component';

describe('WizardCreatorFormDynamicElementsComponent', () => {
  let component: WizardCreatorFormDynamicElementsComponent;
  let fixture: ComponentFixture<WizardCreatorFormDynamicElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorFormDynamicElementsComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorFormDynamicElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
