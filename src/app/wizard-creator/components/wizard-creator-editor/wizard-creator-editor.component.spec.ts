import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardCreatorEditorComponent } from './wizard-creator-editor.component';

describe('WizardCreatorEditorComponent', () => {
  let component: WizardCreatorEditorComponent;
  let fixture: ComponentFixture<WizardCreatorEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WizardCreatorEditorComponent]
    });
    fixture = TestBed.createComponent(WizardCreatorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
