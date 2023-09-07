import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleIdeaCardComponent } from './article-idea-card.component';

describe('ArticleIdeaCardComponent', () => {
  let component: ArticleIdeaCardComponent;
  let fixture: ComponentFixture<ArticleIdeaCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleIdeaCardComponent]
    });
    fixture = TestBed.createComponent(ArticleIdeaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
