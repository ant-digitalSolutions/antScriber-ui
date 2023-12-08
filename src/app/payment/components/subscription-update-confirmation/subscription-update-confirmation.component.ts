import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  SubscriptionUpdateDTO,
  SubscriptionUpdateType,
} from '../../dtos/subscription-update.dto';
import { PaymentService } from '../../services/payment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { IPriceCardData } from 'src/app/pricing/dto/pricing-card-data.interface';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subscription-update-confirmation',
  templateUrl: './subscription-update-confirmation.component.html',
  styleUrls: ['./subscription-update-confirmation.component.scss'],
})
export class SubscriptionUpdateConfirmationComponent implements OnInit {
  mainBtnText: 'Confirm' | 'Cancel' = 'Confirm';
  secondaryBtnText: 'Confirm' | 'Cancel' = 'Cancel';

  isUpgrade = true;

  isLoading = true;

  _isAnnualPricing: boolean;

  _subscriptionUpdateDto: SubscriptionUpdateDTO;

  dataSource: MatTableDataSource<{ label: string; value: string }>;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionUpdateConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      priceCard: IPriceCardData;
      updateType: SubscriptionUpdateType;
      isAnnualPricing: boolean;
    },
    private _paymentService: PaymentService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    protected $gaService: GoogleAnalyticsService
  ) {
    this.dialogRef.disableClose = true;
    this._isAnnualPricing = this.data.isAnnualPricing;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.spinner.show();

    this._paymentService
      .getSubscriptionUpdateData(this.stripePriceId)
      .subscribe((r) => {
        if (r.success) {
          r.data!.status = this.updateType;
          this._subscriptionUpdateDto = r.data!;
          this.setPaymentDetails();
        } else {
          this.$gaService.event('plans', 'open_update_plan_error', r.message);
        }
      });
  }

  onConfirm(): void {
    this.isLoading = true;
    this.spinner.show();
    this.$gaService.event('plans', 'update', 'start_process');

    this._paymentService
      .updateSubscription(this._subscriptionUpdateDto)
      .subscribe((r) => {
        this.spinner.hide();
        if (r.success) {
          this.dialogRef.close(true);
          this.$gaService.event('plans', 'update', 'success');
        } else {
          this.dialogRef.close(false);
          this._snackBar.open(r.message, undefined, {
            duration: 4000,
            panelClass: 'snack-error',
          });
          this.$gaService.event('plans', 'update_error', r.error);
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close(false);
    this.$gaService.event('plans', 'update', 'close_modal');
  }

  private setPaymentDetails() {
    const paymentDetails = [];
    this.isUpgrade =
      this._subscriptionUpdateDto.status === SubscriptionUpdateType.Upgrade;

    paymentDetails.push({
      label: `Plan ${this._subscriptionUpdateDto.newPlanName} (${this._subscriptionUpdateDto.newPlanBilled})`,
      value: `$${
        this._subscriptionUpdateDto.newPlanCost
      } ${this._subscriptionUpdateDto.currency.toUpperCase()}`,
    });

    if (this._subscriptionUpdateDto.startingBalance < 0) {
      paymentDetails.push({
        label: 'Available Balance',
        value: `-$${
          this._subscriptionUpdateDto.startingBalance * -1
        } ${this._subscriptionUpdateDto.currency.toUpperCase()}`,
      });
    }

    paymentDetails.push({
      label:
        this._subscriptionUpdateDto.currentSubscriptionCostingDetails
          .description,
      value: `-$${
        this._subscriptionUpdateDto.currentSubscriptionCostingDetails.amount *
        -1
      } ${this._subscriptionUpdateDto.currency.toUpperCase()}`,
    });

    paymentDetails.push({
      label: '<strong>To Pay Now</strong>',
      value: `<strong>$${
        this._subscriptionUpdateDto.toPayNow
      } ${this._subscriptionUpdateDto.currency.toUpperCase()} *</strong>`,
    });

    this.dataSource = new  MatTableDataSource<{ label: string; value: string }>(paymentDetails)

    this.spinner.hide();
    this.isLoading = false;
  }

  intervalSelected($event: MatRadioChange) {
    this._isAnnualPricing = $event.value;
    this.getData();
  }

  public get selectedCard(): IPriceCardData {
    return this.data?.priceCard;
  }

  public get updateType(): SubscriptionUpdateType {
    return this.data?.updateType;
  }

  public get isAnnualPricing(): boolean {
    return this._isAnnualPricing;
  }

  public get stripePriceId(): string {
    return this._isAnnualPricing
      ? this.selectedCard?.stripeYearlyPriceId
      : this.selectedCard?.stripeMonthlyPriceId;
  }
}
