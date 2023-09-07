import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlogProjectsComponent } from './list-blog-projects.component';

describe('ListBlogProjectsComponent', () => {
  let component: ListBlogProjectsComponent;
  let fixture: ComponentFixture<ListBlogProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBlogProjectsComponent]
    });
    fixture = TestBed.createComponent(ListBlogProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
