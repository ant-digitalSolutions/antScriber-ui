import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CheckoutReturnComponent } from './components/checkout-return/checkout-return.component';
import { SubscriptionCheckoutComponent } from './components/subscription-checkout/subscription-checkout.component';
import { PaymentsModuleRoutes } from './payments.routing';
import { PaymentService } from './services/payment.service';
import { ListPaymentsComponent } from './components/list-payments/list-payments.component';

@NgModule({
  declarations: [SubscriptionCheckoutComponent, CheckoutReturnComponent, ListPaymentsComponent],
  imports: [CommonModule, RouterModule.forChild(PaymentsModuleRoutes), MaterialModule],
  providers: [PaymentService],
})
export class PaymentModule {}
