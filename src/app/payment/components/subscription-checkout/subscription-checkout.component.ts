import { Component, Input, OnInit } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-subscription-checkout',
  templateUrl: './subscription-checkout.component.html',
  styleUrls: ['./subscription-checkout.component.scss']
})
export class SubscriptionCheckoutComponent implements OnInit {

  @Input() prodPriceId: string;

  constructor(private _paymentService: PaymentService, private stripeService: StripeService) {

  }


  ngOnInit(): void {

  }

  checkout() {
    this._paymentService.generatePaymentSession(this.prodPriceId)
      .pipe(
        switchMap(result => {
          return this.stripeService.redirectToCheckout({ sessionId: result.data.id })
        })
      )
      .subscribe(result => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      });
  }

}
