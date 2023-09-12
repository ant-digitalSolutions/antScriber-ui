import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesInTableComponent } from './list-articles-in-table.component';

describe('ListArticlesInTableComponent', () => {
  let component: ListArticlesInTableComponent;
  let fixture: ComponentFixture<ListArticlesInTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArticlesInTableComponent]
    });
    fixture = TestBed.createComponent(ListArticlesInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
