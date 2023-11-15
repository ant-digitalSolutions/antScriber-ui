import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordUsageByDateStackedColumnsComponent } from './word-usage-by-date-stacked-columns.component';

describe('WordUsageByDateStackedColumnsComponent', () => {
  let component: WordUsageByDateStackedColumnsComponent;
  let fixture: ComponentFixture<WordUsageByDateStackedColumnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordUsageByDateStackedColumnsComponent]
    });
    fixture = TestBed.createComponent(WordUsageByDateStackedColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
