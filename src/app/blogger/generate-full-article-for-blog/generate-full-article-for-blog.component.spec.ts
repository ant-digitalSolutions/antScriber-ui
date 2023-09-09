import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFullArticleForBlogComponent } from './generate-full-article-for-blog.component';

describe('GenerateFullArticleForBlogComponent', () => {
  let component: GenerateFullArticleForBlogComponent;
  let fixture: ComponentFixture<GenerateFullArticleForBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateFullArticleForBlogComponent]
    });
    fixture = TestBed.createComponent(GenerateFullArticleForBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
