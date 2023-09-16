import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionFieldRenderAndEditorComponent } from './option-field-render-and-editor.component';

describe('OptionFieldRenderAndEditorComponent', () => {
  let component: OptionFieldRenderAndEditorComponent;
  let fixture: ComponentFixture<OptionFieldRenderAndEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionFieldRenderAndEditorComponent]
    });
    fixture = TestBed.createComponent(OptionFieldRenderAndEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
