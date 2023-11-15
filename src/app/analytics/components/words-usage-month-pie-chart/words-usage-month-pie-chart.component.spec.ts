import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsUsageMonthPieChartComponent } from './words-usage-month-pie-chart.component';

describe('WordsUsageMonthPieChartComponent', () => {
  let component: WordsUsageMonthPieChartComponent;
  let fixture: ComponentFixture<WordsUsageMonthPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordsUsageMonthPieChartComponent]
    });
    fixture = TestBed.createComponent(WordsUsageMonthPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
