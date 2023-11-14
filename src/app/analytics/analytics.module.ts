import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnalyticsService } from './services/analytics.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [AnalyticsService]
})
export class AnalyticsModule { }
