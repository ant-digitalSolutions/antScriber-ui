import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesCardsComponent } from './list-articles-cards.component';

describe('ListArticlesCardsComponent', () => {
  let component: ListArticlesCardsComponent;
  let fixture: ComponentFixture<ListArticlesCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListArticlesCardsComponent]
    });
    fixture = TestBed.createComponent(ListArticlesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
