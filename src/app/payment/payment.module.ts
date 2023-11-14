import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnalyticsModule } from '../analytics/analytics.module';
import { MaterialModule } from '../material.module';
import { CheckoutReturnComponent } from './components/checkout-return/checkout-return.component';
import { ListPaymentsComponent } from './components/list-payments/list-payments.component';
import { SubscriptionCheckoutComponent } from './components/subscription-checkout/subscription-checkout.component';
import { SubscriptionDetailsComponent } from './components/subscription-details/subscription-details.component';
import { PaymentsModuleRoutes } from './payments.routing';
import { PaymentService } from './services/payment.service';
import { CancelSubscriptionConfirmationComponent } from './components/cancel-subscription-confirmation/cancel-subscription-confirmation.component';

@NgModule({
  declarations: [SubscriptionCheckoutComponent, CheckoutReturnComponent, ListPaymentsComponent, SubscriptionDetailsComponent, CancelSubscriptionConfirmationComponent],
  imports: [CommonModule, RouterModule.forChild(PaymentsModuleRoutes), MaterialModule, AnalyticsModule],
  providers: [PaymentService],
})
export class PaymentModule {}
