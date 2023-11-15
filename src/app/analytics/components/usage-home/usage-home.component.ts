import { Component } from '@angular/core';
import { IWordsUsageDto } from '../../dtos/word-usage.dto';
import { WordsUsageByDay } from '../../dtos/words-usage-by-day.dot';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-usage-home',
  templateUrl: './usage-home.component.html',
  styleUrls: ['./usage-home.component.scss']
})
export class UsageHomeComponent {

  wordsUsage: IWordsUsageDto;
  wordsUsageByDay: WordsUsageByDay[];

  constructor(private _analyticService: AnalyticsService){}


  ngOnInit(): void {
   this.getData()
  }

  getData() {
    this._analyticService.getWordsUsage().subscribe(r => {
      if (r.success) {
        this.wordsUsage = r.data!;
      }
    })
   
    this._analyticService.getWordsUsageByDay().subscribe(r => {
      if (r.success) {
        this.wordsUsageByDay = r.data!;
      }
    })
  }
}
