import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';
import { SubscriptionDetailsComponent } from 'src/app/payment/components/subscription-details/subscription-details.component';
import { SubscriptionResponseDTO } from 'src/app/payment/dtos/subscription-response.dto';
import { PaymentService } from 'src/app/payment/services/payment.service';
import { UserSubscriptionDto } from 'src/app/user/dto/user-subscription-data.dto';
import { UserService } from 'src/app/user/services/user.service';
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

  userCurrentSubscription: UserSubscriptionDto;

  // the index of the card that represent the current subscription
  currentSubscriptionCardIndex = -1;

  subscriptionInfo: SubscriptionResponseDTO;

  constructor(
    private _paymentService: PaymentService,
    private stripeService: StripeService,
    private _userService: UserService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.checkCurrentSubscription();
  }

  checkCurrentSubscription() {
    this.userCurrentSubscription = this._userService.getUserSubscription();
   

    if (this.userCurrentSubscription.mainSubscription === ProductsEnum.FREE) {
      return;
    }

    this.currentSubscriptionCardIndex = this.pricecards.find(
      (c) => c.id === this.userCurrentSubscription.mainSubscription
    )!.index;
  }

  checkout(priceData: IPriceCardData) {
    const stripePriceId = this.annualPricing
      ? priceData?.stripeYearlyPriceId
      : priceData?.stripeMonthlyPriceId;

    this._paymentService
      .generatePaymentSession(stripePriceId!)
      .pipe(
        switchMap((result) => {
          return this.stripeService.redirectToCheckout({
            sessionId: result.data.id,
          });
        })
      )
      .subscribe((result) => {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
          alert(result.error.message);
        }
      });
  }

  yearlyPrice(cardData: IPriceCardData) {
    return Math.round(
      (cardData.planOriginalPrice * 12 -
        cardData.planOriginalPrice *
          12 *
          (cardData.planAnnualPercentOff! / 100)) /
        12
    );
  }

  /**
   * Check if the user's subscription can be upgradable to the current card.
   *
   * Return 1 if it can;
   * 0 if its the same subscription
   * -1 if the user can downgrade
   *
   * @param {IPriceCardData} card
   * @return {*}  {number}
   * @memberof AppPricingComponent
   */
  checkIfShouldUpgrade(card: IPriceCardData): number {
    if (card.index > this.currentSubscriptionCardIndex) {
      return 1;
    }

    if (card.index < this.currentSubscriptionCardIndex) {
      return -1;
    }

    if (
      !this.annualPricing &&
      this.userCurrentSubscription.stripePriceId === card.stripeYearlyPriceId
    ) {
      return -1;
    }

    if (
      this.annualPricing &&
      this.userCurrentSubscription.stripePriceId === card.stripeMonthlyPriceId
    ) {
      return 1;
    }

    return 0;
  }

  renderModalWithPlanDetails() {
    return this.dialog.open(SubscriptionDetailsComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'subscription-details-modal',
    });
  }
}
