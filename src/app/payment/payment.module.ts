import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CheckoutReturnComponent } from './components/checkout-return/checkout-return.component';
import { SubscriptionCheckoutComponent } from './components/subscription-checkout/subscription-checkout.component';
import { PaymentsModuleRoutes } from './payments.routing';
import { PaymentService } from './services/payment.service';

@NgModule({
  declarations: [SubscriptionCheckoutComponent, CheckoutReturnComponent],
  imports: [CommonModule, RouterModule.forChild(PaymentsModuleRoutes), MaterialModule],
  providers: [PaymentService],
})
export class PaymentModule {}
