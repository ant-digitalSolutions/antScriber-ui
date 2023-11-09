import { Component } from '@angular/core';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { PaymentService } from 'src/app/payment/services/payment.service';
import { cardPricing_standard } from '../../data/card-pricing-standard.data';
import { IPriceCardData } from '../../dto/pricing-card-data.interface';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class AppPricingComponent {
  annualPricing = true;

  // yearlyPrice: any = (a: any, b: number) => ;



  // card 1
  pricecards: IPriceCardData[] = cardPricing_standard;

  constructor(private _paymentService: PaymentService, private stripeService: StripeService) {

  }


  ngOnInit(): void {

  }

  checkout(priceId: number) {
    const priceData = this.pricecards.find(p => p.id === priceId);
    const stripePriceId = this.annualPricing ? priceData?.stripeYearlyPriceId : priceData?.stripeMonthlyPriceId;

    this._paymentService.generatePaymentSession(stripePriceId!)
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

  yearlyPrice(cardData: IPriceCardData) {
    return Math.round((cardData.planOriginalPrice * 12 - cardData.planOriginalPrice * 12 * (cardData.planAnnualPercentOff! / 100)) / 12);
  }
}
