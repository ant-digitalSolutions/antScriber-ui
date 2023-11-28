import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  SubscriptionUpdateDTO,
  SubscriptionUpdateType,
} from '../../dtos/subscription-update.dto';
import { PaymentService } from '../../services/payment.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.isUpgrade = this.data.status === SubscriptionUpdateType.Upgrade;

    this.setPaymentDetails();
  }

  onConfirm(): void {
    this.isLoading = true;
    this.spinner.show();
    this._paymentService.updateSubscription(this.data).subscribe((r) => {
      this.spinner.hide();
      if (r.success) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
        this._snackBar.open(r.message, undefined, {
          duration: 4000,
          panelClass: 'snack-error'
        });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private setPaymentDetails() {
    this._dataSourcePaymentDetails = [];

    this.dataSourcePaymentDetails.push(
      {
        label: `Plan ${this.data.newPlanName} (${this.data.newPlanBilled})`,
        value: `$${this.data.newPlanCost} ${this.data.currency.toUpperCase()}`,
      },
    )

    if (this.data.startingBalance < 0) {
      this._dataSourcePaymentDetails.push( {
        label: 'Available Balance',
        value: `-$${this.data.startingBalance * -1} ${this.data.currency.toUpperCase()}`,
      },)
    }

    this.dataSourcePaymentDetails.push({
      label: this.data.currentSubscriptionCostingDetails.description,
      value: `-$${this.data.currentSubscriptionCostingDetails.amount * -1} ${this.data.currency.toUpperCase()}`
    })

    this._dataSourcePaymentDetails.push(
      {
        label: '<strong>To Pay Now</strong>',
        value: `<strong>$${this.data.toPayNow} ${this.data.currency.toUpperCase()} *</strong>`,
      },
    );

   
  }

  public get dataSourcePaymentDetails() {
    return this._dataSourcePaymentDetails;
  }
}
