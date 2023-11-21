import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionUpdateDTO } from '../../dtos/subscription-update.dto';
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
  ) {
  }

  ngOnInit(): void {
    //
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
    this._paymentService.updateSubscription(this.data)
    .subscribe(r => {
      if (r.success) {
        console.log('subscription updated');
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  public get dataSource() {
      return [
        { label: 'New Plan Name', value: 'Flow' },
        { label: 'Plan Pricing', value: '302' },
        // { label: 'Plan Pricing', value: `${(this.subscription!.plan!.amount / 100).toFixed(2)} ${this.subscription?.currency?.toUpperCase()}` },
        // { label: 'Billed', value: this.subscription?.plan?.interval === 'year' ? 'Yearly' : 'Monthly' }
      ];
    }
}
