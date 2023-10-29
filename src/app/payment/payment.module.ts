import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from './services/payment.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
