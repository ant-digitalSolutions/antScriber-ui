import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { ProductsEnum } from 'src/app/common/subscriptions/products.enum';
import { DialogService } from 'src/app/dialogs/dialog.service';
import { SubscriptionDetailsComponent } from 'src/app/payment/components/subscription-details/subscription-details.component';
import { SubscriptionUpdateConfirmationComponent } from 'src/app/payment/components/subscription-update-confirmation/subscription-update-confirmation.component';
import { SubscriptionResponseDTO } from 'src/app/payment/dtos/subscription-response.dto';
import {
  SubscriptionUpdateDTO,
  SubscriptionUpdateType,
} from 'src/app/payment/dtos/subscription-update.dto';
import { PaymentService } from 'src/app/payment/services/payment.service';
import { UserSubscriptionDto } from 'src/app/user/dto/user-subscription-data.dto';
import { getCardPricingStandard } from '../../data/card-pricing-standard.data';
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
  pricecards: IPriceCardData[] = getCardPricingStandard();

  userCurrentSubscription: UserSubscriptionDto;

  // the index of the card that represent the current subscription
  currentSubscriptionCardIndex = -1;

  subscriptionInfo: SubscriptionResponseDTO;

  constructor(
    private _paymentService: PaymentService,
    private stripeService: StripeService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    protected $gaService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.checkCurrentSubscription();
    this.$gaService.event('plans', 'load_main_page');
  }

  checkCurrentSubscription() {
    this._paymentService.getSubscriptionInfo().subscribe((r) => {
      if (r.success) {
        this.handleUserSubscriptionData(r.data);
      }
    });
  }

  checkout(priceData: IPriceCardData) {
    const stripePriceId = this.annualPricing
      ? priceData?.stripeYearlyPriceId
      : priceData?.stripeMonthlyPriceId;

    if (
      !this.userCurrentSubscription ||
      this.userCurrentSubscription.mainSubscription === ProductsEnum.FREE
    ) {
      this._paymentService
        .generatePaymentSession(stripePriceId!)
        .pipe(
          switchMap((result) => {
            this.$gaService.event(
              'plans',
              'start_checkout_process',
              stripePriceId
            );
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
      const updateType: SubscriptionUpdateType =
        this.checkIfShouldUpgrade(priceData) === 1
          ? SubscriptionUpdateType.Upgrade
          : SubscriptionUpdateType.Downgrade;
      this.updateSubscription(stripePriceId, updateType, priceData);
    }
  }

  updateSubscription(priceId: string, updateType: SubscriptionUpdateType, priceCard: IPriceCardData) {
    this.$gaService.event('plans', 'open_update_plan_modal', priceId);

    const dialog = this.dialog.open(SubscriptionUpdateConfirmationComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'subscription-details-modal',
      data: {priceCard, updateType, isAnnualPricing: this.annualPricing },
    });

    dialog.afterClosed().subscribe((subscriptionUpdated) => {
      if (subscriptionUpdated) {
        this.dialogService.openMessageDialog({
          message: 'Your subscription was successfully updated.',
          okBtnText: 'Ok',
        });
        this.checkCurrentSubscription();
      } else {
        //todo: don't update
      }
    });

    // this._paymentService.getSubscriptionUpdateData(priceId).subscribe((r) => {
    //   if (r.success) {
    //     r.data!.status = updateType;
    //     this.handleSubscriptionUpdateResponse(r.data!);
    //   } else {
    //     this.$gaService.event('plans', 'open_update_plan_error', r.message);
    //   }
    // });
  }

  handleSubscriptionUpdateResponse(subscriptionUpdate: SubscriptionUpdateDTO) {
    const dialog = this.dialog.open(SubscriptionUpdateConfirmationComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'subscription-details-modal',
      data: subscriptionUpdate,
    });

    dialog.afterClosed().subscribe((subscriptionUpdated) => {
      if (subscriptionUpdated) {
        this.dialogService.openMessageDialog({
          message: 'Your subscription was successfully updated.',
          okBtnText: 'Ok',
        });
        this.checkCurrentSubscription();
      } else {
        //todo: don't update
      }
    });
  }

  priceToShow(cardData: IPriceCardData): number {
    return this.annualPricing
      ? cardData.planAnnualPrice
      : cardData.planMonthlyPrice;
  }

  yearlyPrice(cardData: IPriceCardData) {
    return cardData.planAnnualPrice;
  }

  annualSaveText(cardData: IPriceCardData): string {
    const savedPercent = Math.floor(
      ((cardData.planMonthlyPrice - cardData.planAnnualPrice) /
        cardData.planMonthlyPrice) *
        100
    );
    return `<span class="text-decoration-line">$${cardData.planMonthlyPrice}</span>, SAVE ${savedPercent}%`;
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
    this.$gaService.event('plans', 'check_current_plan');
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
      stripePriceId: subscription.plan?.id!,
    };

    this.currentSubscriptionCardIndex = this.pricecards.find(
      (c) => c.id === this.userCurrentSubscription.mainSubscription
    )!.index;
  }

  setPlanInterval(interval: 'annual' | 'monthly') {
    if (interval === 'annual') {
      this.annualPricing = true;
    } else {
      this.annualPricing = false;
    }
  }

  public get mobileView(): boolean {
    return window.innerWidth < 600;
  }

  public get billedInterval(): string {
    return this.annualPricing ? 'annually' : 'monthly';
  }
}
