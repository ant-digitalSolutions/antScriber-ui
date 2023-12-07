import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IWordsUsageDto } from 'src/app/analytics/dtos/word-usage.dto';
import { AnalyticsService } from 'src/app/analytics/services/analytics.service';
import { getPlanDetailsFromStripeProductId } from 'src/app/pricing/data/card-pricing-standard.data';
import { SubscriptionResponseDTO } from '../../dtos/subscription-response.dto';
import { PaymentService } from '../../services/payment.service';
import { CancelSubscriptionConfirmationComponent } from '../cancel-subscription-confirmation/cancel-subscription-confirmation.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss'],
})
export class SubscriptionDetailsComponent {
  subscription?: SubscriptionResponseDTO;

  planName: string | undefined;

  wordsUsage: IWordsUsageDto;

  isLoadingSubscription = true;

  isLoadingWordUsage = true;

  isCanceling = false;

  constructor(
    public dialogRef: MatDialogRef<SubscriptionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _analyticsService: AnalyticsService,
    private dialog: MatDialog,
    private _paymentService: PaymentService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getSubscriptionData()
    this.getWordsUsage();

    const plan = getPlanDetailsFromStripeProductId(
      this.subscription?.plan?.product!
    );
    if (plan) {
      this.planName = plan.plan;
    }
  }

  getSubscriptionData() {
    this._paymentService.getSubscriptionInfo().subscribe(r => {
      if (r.success) {
        this.subscription = r.data;
      }

      this.isLoadingSubscription = false;
    })
  }

  getWordsUsage() {
    this._analyticsService.getWordsUsage().subscribe((r) => {
      if (r.success) {
        this.wordsUsage = r.data!;
      }

      this.isLoadingWordUsage = false;
    });
  }

  onClose(): void {
    this.dialogRef.close();
    this.spinner.show()
  }

  openOfferModal(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(CancelSubscriptionConfirmationComponent, {
      width: '600px',
      maxWidth: '95vw',
      data: {
        /* pass any data if needed */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Logic for accepting the offer
      } else {
        // Logic for declining the offer
      }
    });
  }

  
  public get isLoading() : boolean {
    const loading = this.isLoadingSubscription || this.isLoadingWordUsage;

    if (!loading) {
      this.spinner.hide();
    } 

    return loading;
  }
  
  
  public get isPremiumUser() : boolean {
    return this.currentPlan !== `FREE`;
  }
  
  
  public get currentPlan() : string {
    return this.subscription? this.planName! : 'FREE';
  }

  public get subscriptionStatus(): string {
    return this.subscription ? this.subscription.status : 'ACTIVE';
  }

  
  public get currentPeriodStart() : number | undefined {
    return this.subscription?.currentPeriodStart ? this.subscription?.currentPeriodStart : undefined
  }

  
  public get dataSource() {
    if (this.subscription && this.wordsUsage) {
      return [
        { label: 'Current Plan', value: this.currentPlan },
        { label: 'Status', value: this.subscriptionStatus.toUpperCase() },
        { label: 'Words per Month (GPT 4)', value: this.wordsUsage.wordsMonthlyLimit_GPT_4 },
        { label: 'Used Words (GPT-4)', value: this.wordsUsage.usageCurrentMonth_GPT_4 },
        { label: 'Words per Month (GPT-3.5)', value: this.wordsUsage.wordsMonthlyLimit_GPT_3 },
        { label: 'Used Words (GPT-3.5)', value: this.wordsUsage.usageCurrentMonth_GPT_3 },
        { label: 'Plan Pricing', value: `${(this.subscription!.plan!.amount / 100).toFixed(2)} ${this.subscription?.currency?.toUpperCase()}` },
        { label: 'Billing Cycle', value: `${new Date(this.subscription?.currentPeriodStart * 1000).toLocaleDateString()} - ${new Date(this.subscription?.currentPeriodEnd * 1000).toLocaleDateString()}` },
        { label: 'Billed', value: this.subscription?.plan?.interval === 'year' ? 'Yearly' : 'Monthly' }
      ];
    } else if (this.wordsUsage) {
      return [
        { label: 'Current Plan', value: 'FREE' },
        { label: 'Status', value: 'Active' },
        { label: 'Words per Month (GPT 4)', value: this.wordsUsage.wordsMonthlyLimit_GPT_4 },
        { label: 'Used Words (GPT-4)', value: this.wordsUsage.usageCurrentMonth_GPT_4 },
        { label: 'Words per Month (GPT-3.5)', value: this.wordsUsage.wordsMonthlyLimit_GPT_3 },
        { label: 'Used Words (GPT-3.5)', value: this.wordsUsage.usageCurrentMonth_GPT_3 },
      ]
    }

    return [
      { label: 'Current Plan', value: 'FREE' },
      { label: 'Status', value: 'Active' },
    ]
  }
  
  

  
  
}
