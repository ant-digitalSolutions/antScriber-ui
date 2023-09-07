import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlogProjectComponent } from './create-blog-project.component';

describe('CreateBlogProjectComponent', () => {
  let component: CreateBlogProjectComponent;
  let fixture: ComponentFixture<CreateBlogProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBlogProjectComponent]
    });
    fixture = TestBed.createComponent(CreateBlogProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
