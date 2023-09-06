import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFromIdeaComponent } from './article-from-idea.component';

describe('ArticleFromIdeaComponent', () => {
  let component: ArticleFromIdeaComponent;
  let fixture: ComponentFixture<ArticleFromIdeaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleFromIdeaComponent]
    });
    fixture = TestBed.createComponent(ArticleFromIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
