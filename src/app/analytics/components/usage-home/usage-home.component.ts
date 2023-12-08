import { Component } from '@angular/core';
import { IWordsUsageDto } from '../../dtos/word-usage.dto';
import { WordsUsageByDay } from '../../dtos/words-usage-by-day.dot';
import { AnalyticsService } from '../../services/analytics.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { NgxSpinnerService } from 'ngx-spinner';

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

  totalWords_gpt_3: number;
  totalWords_gpt_4: number;

  loading = false;

  constructor(
    private _analyticService: AnalyticsService,
    protected $gaService: GoogleAnalyticsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.$gaService.event('usage_area', 'load_main_page');
  }

  getData() {
    this.spinner.show('pieCharts');
    this.spinner.show('mainGraph');
    this._analyticService.getWordsUsage().subscribe((r) => {
      if (r.success) {
        this.wordsUsage = r.data!;
        this.spinner.hide('pieCharts')
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
          this.calculateTotalWords_gpt_3();
          this.calculateTotalWords_gpt_4();
          this.spinner.hide('mainGraph');
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
      this.$gaService.event('usage_area', 'select_month', 'previous');
    }
  }

  nextMonth() {
    if (this.selectedMonthIndex < this.monthTimeLineString.length - 1) {
      this.selectedMonthIndex++;
      this.getWordsUsageByDay();
      this.$gaService.event('usage_area', 'select_month', 'next');
    }
  }

  calculateTotalWords_gpt_3(): void {
    const total = this.wordsUsageByDay
      .filter((u) => u!.gpt! === 'gpt-3.5')
      .map((u) => +u.words)
      .reduce((p, c) => p + c, 0);

    this.totalWords_gpt_3 = total;
  }

  calculateTotalWords_gpt_4(): void {
    const total = this.wordsUsageByDay
      .filter((u) => u!.gpt! === 'gpt-4')
      .map((u) => +u.words)
      .reduce((p, c) => p + c, 0);

    this.totalWords_gpt_4 = total;
  }

  public get selectedMonth(): string {
    return this.monthTimeLineString
      ? this.monthTimeLineString[this.selectedMonthIndex]
      : '';
  }
}
