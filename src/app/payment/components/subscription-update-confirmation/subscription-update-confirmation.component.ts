import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  SubscriptionUpdateDTO,
  SubscriptionUpdateType,
} from '../../dtos/subscription-update.dto';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-subscription-update-confirmation',
  templateUrl: './subscription-update-confirmation.component.html',
  styleUrls: ['./subscription-update-confirmation.component.scss'],
})
export class SubscriptionUpdateConfirmationComponent implements OnInit {
  mainBtnText: 'Confirm' | 'Cancel';
  secondaryBtnText: 'Confirm' | 'Cancel';

  isUpgrade = true;

  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionUpdateConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubscriptionUpdateDTO,
    private _paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.isUpgrade = this.data.status === SubscriptionUpdateType.Upgrade;

    if (this.data.newPlanName || this.data.newPlanName == '') {
      this.data.newPlanName = 'Flow';
      this.data.newPlanCost = 45;
      this.data.toPayNow = 34;
      this.data.currency = 'USD';
      this.data.moneyBalance = 240;
    }

    if (this.isUpgrade) {
      // todo: check if is upgrade
      this.mainBtnText = 'Confirm';
      this.secondaryBtnText = 'Cancel';
    } else {
      this.mainBtnText = 'Cancel';
      this.secondaryBtnText = 'Confirm';
    }
  }

  onConfirm(): void {
    this.isLoading = true;
    this._paymentService.updateSubscription(this.data).subscribe((r) => {
      if (r.success) {
        console.log('subscription updated');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  public get dataSource() {
    return [
      { label: 'New Plan Name', value: this.data.newPlanName },
      {
        label: 'Plan Pricing',
        value: `$${this.data.newPlanCost} ${this.data.currency}`,
      },
      {
        label: 'Billing Interval',
        value: this.data.billed === 'yearly' ? 'Yearly' : 'Monthly',
      },

      // { label: 'Plan Pricing', value: `${(this.subscription!.plan!.amount / 100).toFixed(2)} ${this.subscription?.currency?.toUpperCase()}` },
    ];
  }

  public get dataSourcePaymentDetails() {
    return [
      {
        label: 'Your Balance',
        value: `$${this.data.moneyBalance} ${this.data.currency}`,
      },
      {
        label: 'To Pay Now',
        value: `$${this.data.toPayNow} ${this.data.currency}`,
      },
      // { label: 'Plan Pricing', value: `${(this.subscription!.plan!.amount / 100).toFixed(2)} ${this.subscription?.currency?.toUpperCase()}` },
    ];
  }

  public get hasPositiveBalance(): boolean {
    return this.data.moneyBalance > 0;
  }
}
