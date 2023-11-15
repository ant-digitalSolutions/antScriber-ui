import { Component } from '@angular/core';
import { IWordsUsageDto } from '../../dtos/word-usage.dto';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-usage-home',
  templateUrl: './usage-home.component.html',
  styleUrls: ['./usage-home.component.scss']
})
export class UsageHomeComponent {

  wordsUsage: IWordsUsageDto;

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
  }
}
