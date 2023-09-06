import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateArticleFromUserParamsComponent } from './generate-article-from-user-params.component';

describe('GenerateArticleFromUserParamsComponent', () => {
  let component: GenerateArticleFromUserParamsComponent;
  let fixture: ComponentFixture<GenerateArticleFromUserParamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateArticleFromUserParamsComponent]
    });
    fixture = TestBed.createComponent(GenerateArticleFromUserParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
