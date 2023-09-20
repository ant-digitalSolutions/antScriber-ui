import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWebpagesCardsComponent } from './list-webpages-cards.component';

describe('ListWebpagesCardsComponent', () => {
  let component: ListWebpagesCardsComponent;
  let fixture: ComponentFixture<ListWebpagesCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWebpagesCardsComponent]
    });
    fixture = TestBed.createComponent(ListWebpagesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
