import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFaqScriptRenderComponent } from './article-faq-script-render.component';

describe('ArticleFaqScriptRenderComponent', () => {
  let component: ArticleFaqScriptRenderComponent;
  let fixture: ComponentFixture<ArticleFaqScriptRenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleFaqScriptRenderComponent]
    });
    fixture = TestBed.createComponent(ArticleFaqScriptRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
