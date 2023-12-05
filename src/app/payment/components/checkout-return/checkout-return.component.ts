import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getCardPricingStandard } from 'src/app/pricing/data/card-pricing-standard.data';
import { UserService } from 'src/app/user/services/user.service';
import { InvoiceDto } from '../../dtos/invoice.dto';
import { PaymentSessionDto } from '../../dtos/payment-session.dto';
import { SubscriptionResponseDTO } from '../../dtos/subscription-response.dto';
import { PaymentService } from '../../services/payment.service';
import { PlanDto } from './../../dtos/plan.dto';
@Component({
  selector: 'app-checkout-return',
  templateUrl: './checkout-return.component.html',
  styleUrls: ['./checkout-return.component.scss'],
})
export class CheckoutReturnComponent implements OnInit {

  sessionId: string;

  paymentSucceed: boolean;

  dataReady = false;

  userFirstName: string;

  paymentSession: PaymentSessionDto;  

  planName: string;

  constructor(private route: ActivatedRoute, private _paymentService: PaymentService, private _userService: UserService) {}

  ngOnInit() {
    this.getSessionParam();

    this.userFirstName = this._userService.userFirstName!;
  }

  getSessionParam() {
    this.sessionId = this.route.snapshot.queryParams['session_id'];

    this._paymentService.getStripeSession(this.sessionId).subscribe(r => {
      if(r.success) {
        this.paymentSucceed = r.data.paymentStatus === 'paid';
        this.paymentSession  = r.data;
        this.setPlanName();
      } else {
        this.paymentSucceed = false;
      }

      this.dataReady = true;
    })
  }

  setPlanName() {
    this.planName = getCardPricingStandard().find(
      (c) => c.id === this.plan.product
    )!.plan;
  }

  
  public get invoice() : InvoiceDto {
    return this.paymentSession.invoice as InvoiceDto;
  }

  
  public get subscription() : SubscriptionResponseDTO {
    return this.paymentSession.subscription as SubscriptionResponseDTO;
  }

  
  public get plan() : PlanDto {
    return this.subscription.plan!;
  }
  
  
  
}
