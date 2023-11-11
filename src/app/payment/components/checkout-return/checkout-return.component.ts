import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';
import { PaymentService } from '../../services/payment.service';
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
      } else {
        this.paymentSucceed = false;
      }
    })
  }
}
