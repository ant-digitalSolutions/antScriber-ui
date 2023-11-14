import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-cancel-subscription-confirmation',
  templateUrl: './cancel-subscription-confirmation.component.html',
  styleUrls: ['./cancel-subscription-confirmation.component.scss'],
})
export class CancelSubscriptionConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelSubscriptionConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _paymentService: PaymentService
  ) {}

  onDecline(): void {
    this._paymentService.cancelSubscription().subscribe(r => {
      if (r.success) {
        console.log('Subscription cancelled');
        this.dialogRef.close(false);
      }
    })
  }

  onAccept(): void {
    this.dialogRef.close(true);
    // TODO: logic to update user's subscription
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
