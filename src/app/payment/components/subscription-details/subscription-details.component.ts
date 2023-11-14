import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getPlanDetailsFromStripeProductId } from 'src/app/pricing/data/card-pricing-standard.data';
import { SubscriptionResponseDTO } from '../../dtos/subscription-response.dto';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss'],
})
export class SubscriptionDetailsComponent {
  subscription: SubscriptionResponseDTO;

  planName: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data.subscription);
    this.subscription = this.data.subscription;

    const plan = getPlanDetailsFromStripeProductId(this.subscription.plan?.product!);
    if (plan) {
      this.planName = plan.plan;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
