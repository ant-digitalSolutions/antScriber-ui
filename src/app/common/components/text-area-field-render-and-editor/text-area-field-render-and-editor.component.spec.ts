import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaFieldRenderAndEditorComponent } from './text-area-field-render-and-editor.component';

describe('TextAreaFieldRenderAndEditorComponent', () => {
  let component: TextAreaFieldRenderAndEditorComponent;
  let fixture: ComponentFixture<TextAreaFieldRenderAndEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextAreaFieldRenderAndEditorComponent]
    });
    fixture = TestBed.createComponent(TextAreaFieldRenderAndEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
