import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AnalyticsModule } from '../analytics/analytics.module';
import { MaterialModule } from '../material.module';
import { AppPricingComponent } from './components/pricing/pricing.component';
import { PlanIntervalSelectorComponent } from './components/plan-interval-selector/plan-interval-selector.component';
import { PlanIntervalSelectorFloatingComponent } from './components/plan-interval-selector-floating/plan-interval-selector-floating.component';



@NgModule({
  declarations: [
    AppPricingComponent,
    PlanIntervalSelectorComponent,
    PlanIntervalSelectorFloatingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    AnalyticsModule 
  ],
  exports: [AppPricingComponent]
})
export class PricingModule { }
