import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WordsUsageMonthPieChartComponent } from './components/words-usage-month-pie-chart/words-usage-month-pie-chart.component';
import { AnalyticsService } from './services/analytics.service';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from '../material.module';
import { UsageHomeComponent } from './components/usage-home/usage-home.component';
import { WordUsageByDateStackedColumnsComponent } from './components/word-usage-by-date-stacked-columns/word-usage-by-date-stacked-columns.component';



@NgModule({
  declarations: [
    WordsUsageMonthPieChartComponent,
    UsageHomeComponent,
    WordUsageByDateStackedColumnsComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    MaterialModule
  ],
  providers: [AnalyticsService]
})
export class AnalyticsModule { }
