import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IWordsUsageDto } from 'src/app/analytics/dtos/word-usage.dto';
import { AnalyticsService } from 'src/app/analytics/services/analytics.service';
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

  wordsUsage: IWordsUsageDto;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    console.log(this.data.subscription);
    this.subscription = this.data.subscription;
    this.getWordsUsage();

    const plan = getPlanDetailsFromStripeProductId(this.subscription.plan?.product!);
    if (plan) {
      this.planName = plan.plan;
    }
  }

  getWordsUsage() {
    this._analyticsService.getWordsUsage().subscribe(r => {
      if (r.success) {
        this.wordsUsage = r.data!;
      }
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
