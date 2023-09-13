import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUploadFeatureImageComponent } from './article-upload-feature-image.component';

describe('ArticleUploadFeatureImageComponent', () => {
  let component: ArticleUploadFeatureImageComponent;
  let fixture: ComponentFixture<ArticleUploadFeatureImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleUploadFeatureImageComponent]
    });
    fixture = TestBed.createComponent(ArticleUploadFeatureImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
