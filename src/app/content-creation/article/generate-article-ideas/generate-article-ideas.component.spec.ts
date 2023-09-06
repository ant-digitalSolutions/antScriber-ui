import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateArticleIdeasComponent } from './generate-article-ideas.component';

describe('GenerateArticleIdeasComponent', () => {
  let component: GenerateArticleIdeasComponent;
  let fixture: ComponentFixture<GenerateArticleIdeasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateArticleIdeasComponent]
    });
    fixture = TestBed.createComponent(GenerateArticleIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
