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
  mainBtnText: 'Confirm' | 'Cancel' = 'Confirm';
  secondaryBtnText: 'Confirm' | 'Cancel' = 'Cancel';

  isUpgrade = true;

  isLoading = false;

  _dataSourcePaymentDetails: {label: string, value: string;}[];

  constructor(
    public dialogRef: MatDialogRef<SubscriptionUpdateConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubscriptionUpdateDTO,
    private _paymentService: PaymentService,
  ) {}

  ngOnInit(): void {
    this.isUpgrade = this.data.status === SubscriptionUpdateType.Upgrade;

    this.setPaymentDetails();
  }

  onConfirm(): void {
    this.isLoading = true;
    this._paymentService.updateSubscription(this.data).subscribe((r) => {
      if (r.success) {
        this.dialogRef.close(true);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private setPaymentDetails() {
    this._dataSourcePaymentDetails = [];
    
    if (this.data.moneyBalance < 0) {
      this._dataSourcePaymentDetails.push( {
        label: 'Your Balance',
        value: `$${this.data.moneyBalance * -1 / 100} ${this.data.currency}`,
      },)
    }

    this._dataSourcePaymentDetails.push(
      {
        label: 'To Pay Now',
        value: `$${this.data.toPayNow} ${this.data.currency}`,
      },
    );

   
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
        value: this.data.newPlanBilled === 'yearly' ? 'Yearly' : 'Monthly',
      },

      // { label: 'Plan Pricing', value: `${(this.subscription!.plan!.amount / 100).toFixed(2)} ${this.subscription?.currency?.toUpperCase()}` },
    ];
  }

  public get dataSourcePaymentDetails() {
    return this._dataSourcePaymentDetails;
  }

  public get hasPositiveBalance(): boolean {
    return this.data.moneyBalance > 0;
  }
}
