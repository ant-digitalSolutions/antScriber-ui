import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlContentEditorComponent } from './html-content-editor.component';

describe('HtmlContentEditorComponent', () => {
  let component: HtmlContentEditorComponent;
  let fixture: ComponentFixture<HtmlContentEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlContentEditorComponent]
    });
    fixture = TestBed.createComponent(HtmlContentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
