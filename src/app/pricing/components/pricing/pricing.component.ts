import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';
import { SubscriptionDetailsComponent } from 'src/app/payment/components/subscription-details/subscription-details.component';
import { SubscriptionUpdateConfirmationComponent } from 'src/app/payment/components/subscription-update-confirmation/subscription-update-confirmation.component';
import { SubscriptionResponseDTO } from 'src/app/payment/dtos/subscription-response.dto';
import { SubscriptionUpdateDTO } from 'src/app/payment/dtos/subscription-update.dto';
import { PaymentService } from 'src/app/payment/services/payment.service';
import { UserSubscriptionDto } from 'src/app/user/dto/user-subscription-data.dto';
import { cardPricing_standard } from '../../data/card-pricing-standard.data';
import { IPriceCardData } from '../../dto/pricing-card-data.interface';
import { DialogService } from 'src/app/dialogs/dialog.service';

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
    private dialog: MatDialog,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.checkCurrentSubscription();
  }

  checkCurrentSubscription() {
    this._paymentService.getSubscriptionInfo().subscribe(r => {
      if (r.success) {
        this.handleUserSubscriptionData(r.data);
      }
    })
  }

  checkout(priceData: IPriceCardData) {
    const stripePriceId = this.annualPricing
      ? priceData?.stripeYearlyPriceId
      : priceData?.stripeMonthlyPriceId;

    if (!this.userCurrentSubscription || this.userCurrentSubscription.mainSubscription === ProductsEnum.FREE) {
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
    } else {

     this.updateSubscription(stripePriceId)
    }
  }

  updateSubscription(priceId: string) {
    this._paymentService
    .getSubscriptionUpdateData(priceId)
    .subscribe((r) => {
      if(r.success) {
        this.handleSubscriptionUpdateResponse(r.data!)
      } else {
        console.log('empty subscription update');
      }
    });
 
   
  }

  handleSubscriptionUpdateResponse(subscriptionUpdate: SubscriptionUpdateDTO) {
    const dialog = this.dialog.open(SubscriptionUpdateConfirmationComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'subscription-details-modal',
      data: subscriptionUpdate
    });

    dialog.afterClosed().subscribe(subscriptionUpdated => {
      if (subscriptionUpdated) {
        this.dialogService.openMessageDialog({
          message: 'Your subscription was successfully updated.',
          okBtnText: 'Ok'
        });
        this.checkCurrentSubscription();
      } else {
        //todo: don't update
      }
    })
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
    // the user has the free subscription
    if (this.currentSubscriptionCardIndex === -1) {
      return 1;
    }

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

  handleUserSubscriptionData(subscription: SubscriptionResponseDTO): void {
    if (subscription.plan?.product === ProductsEnum.FREE) {
      return;
    }

    this.userCurrentSubscription = {
      mainSubscription: subscription.plan?.product as any,
      stripePriceId: subscription.plan?.id!
    }

    this.currentSubscriptionCardIndex = this.pricecards.find(
      (c) => c.id === this.userCurrentSubscription.mainSubscription
    )!.index;
  }
}
