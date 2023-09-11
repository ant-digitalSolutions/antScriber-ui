import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFullArticleForBlogTextFieldComponent } from './generate-full-article-for-blog-text-field.component';

describe('GenerateFullArticleForBlogTextFieldComponent', () => {
  let component: GenerateFullArticleForBlogTextFieldComponent;
  let fixture: ComponentFixture<GenerateFullArticleForBlogTextFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateFullArticleForBlogTextFieldComponent]
    });
    fixture = TestBed.createComponent(GenerateFullArticleForBlogTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
