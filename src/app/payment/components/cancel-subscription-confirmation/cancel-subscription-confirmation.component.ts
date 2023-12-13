import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/dialogs/dialog.service';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-cancel-subscription-confirmation',
  templateUrl: './cancel-subscription-confirmation.component.html',
  styleUrls: ['./cancel-subscription-confirmation.component.scss'],
})
export class CancelSubscriptionConfirmationComponent {
  cancelingRequest = false;

  constructor(
    public dialogRef: MatDialogRef<CancelSubscriptionConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _paymentService: PaymentService,
    private _dialogService: DialogService
  ) {}

  onDecline(): void {
    this.cancelingRequest = true;
    this._paymentService.cancelSubscription().subscribe((r) => {
      if (r.success) {
        this.dialogRef.close(false);
        this._dialogService.openMessageDialog({
          okBtnText: 'OK',
          message:
            'Your subscription has been canceled. You can continue enjoying your premium features until the end of the period',
        });
      }

      this.cancelingRequest = false;
    });
  }

  onAccept(): void {
    this.dialogRef.close(true);
    // TODO: logic to update user's subscription
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
