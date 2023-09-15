import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageSectionEditorComponent } from './webpage-section-editor.component';

describe('WebpageSectionEditorComponent', () => {
  let component: WebpageSectionEditorComponent;
  let fixture: ComponentFixture<WebpageSectionEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebpageSectionEditorComponent]
    });
    fixture = TestBed.createComponent(WebpageSectionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
