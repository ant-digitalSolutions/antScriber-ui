import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughTourComponent } from './walktrhough-tour/walkthrough-tour.component';
import { EventsHubModule } from '../events-hub/events-hub.module';



@NgModule({
  declarations: [
    WalkthroughTourComponent
  ],
  imports: [
    CommonModule,
    EventsHubModule
  ],
  exports: [
    WalkthroughTourComponent
  ]
})
export class WalkthroughToursModule { }
