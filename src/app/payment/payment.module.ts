import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from './services/payment.service';
import { SubscriptionCheckoutComponent } from './components/subscription-checkout/subscription-checkout.component';



@NgModule({
  declarations: [
    SubscriptionCheckoutComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule { }
