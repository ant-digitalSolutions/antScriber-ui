import { Component } from '@angular/core';
import { IWordsUsageDto } from '../../dtos/word-usage.dto';
import { WordsUsageByDay } from '../../dtos/words-usage-by-day.dot';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-usage-home',
  templateUrl: './usage-home.component.html',
  styleUrls: ['./usage-home.component.scss'],
})
export class UsageHomeComponent {
  wordsUsage: IWordsUsageDto;
  wordsUsageByDay: WordsUsageByDay[];

  selectedMonthIndex: number;

  monthTimeLineString: string[];
  monthTimelineDates: Date[];

  loading = true;

  constructor(private _analyticService: AnalyticsService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._analyticService.getWordsUsage().subscribe((r) => {
      if (r.success) {
        this.wordsUsage = r.data!;
      }
    });

    this._analyticService.getOldestDateOfData().subscribe((r) => {
      if (r.success) {
        const date = new Date(r.data!);
        this.generateMonthlyTimeline(date);
      }
    });
  }

  getWordsUsageByDay() {
    this._analyticService
      .getWordsUsageByDay(this.monthTimelineDates[this.selectedMonthIndex])
      .subscribe((r) => {
        if (r.success) {
          this.wordsUsageByDay = r.data!;
        }
      });
  }

  generateMonthlyTimeline(startDate: Date): void {
    const monthsString = [];
    this.monthTimelineDates = [];
    const currentDate = new Date();
    let currentMonth = startDate.getMonth();
    let currentYear = startDate.getFullYear();
    while (
      currentYear < currentDate.getFullYear() ||
      (currentYear === currentDate.getFullYear() &&
        currentMonth <= currentDate.getMonth())
    ) {
      monthsString.push(
        `${new Date(currentYear, currentMonth).toLocaleString('default', {
          month: 'long',
        })} ${currentYear}`
      );
      this.monthTimelineDates.push(new Date(currentYear, currentMonth));
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
    this.monthTimeLineString = monthsString;
    this.selectedMonthIndex = monthsString.length - 1;

    this.getWordsUsageByDay();
  }

  previousMonth() {
    if (this.selectedMonthIndex > 0) {
      this.selectedMonthIndex--;
      this.getWordsUsageByDay();
    }
  }

  nextMonth() {
    if (this.selectedMonthIndex < this.monthTimeLineString.length - 1) {
      this.selectedMonthIndex++;
      this.getWordsUsageByDay();
    }
  }

  public get selectedMonth(): string {
    return this.monthTimeLineString
      ? this.monthTimeLineString[this.selectedMonthIndex]
      : '';
  }
}
