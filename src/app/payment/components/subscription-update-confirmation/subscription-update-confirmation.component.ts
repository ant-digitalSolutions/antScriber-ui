import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-update-confirmation',
  templateUrl: './subscription-update-confirmation.component.html',
  styleUrls: ['./subscription-update-confirmation.component.scss'],
})
export class SubscriptionUpdateConfirmationComponent implements OnInit {
  mainBtnText: 'Confirm' | 'Cancel';
  secondaryBtnText: 'Confirm' | 'Cancel';

  isUpgrade = true;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionUpdateConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = {
      newSubscriptionName: 'Premium Plan',
      price: 20.99,
      chargeAmount: 20.99
    }
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
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
