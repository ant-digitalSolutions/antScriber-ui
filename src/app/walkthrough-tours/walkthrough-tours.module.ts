import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalkthroughTourComponent } from './walktrhough-tour/walkthrough-tour.component';



@NgModule({
  declarations: [
    WalkthroughTourComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WalkthroughTourComponent
  ]
})
export class WalkthroughToursModule { }
