import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleIdeasComponent } from './list-article-ideas.component';

describe('ListArticleIdeasComponent', () => {
  let component: ListArticleIdeasComponent;
  let fixture: ComponentFixture<ListArticleIdeasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArticleIdeasComponent]
    });
    fixture = TestBed.createComponent(ListArticleIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
