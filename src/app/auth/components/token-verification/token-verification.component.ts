import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-token-verification',
  templateUrl: './token-verification.component.html',
  styleUrls: ['./token-verification.component.scss'],
})
export class TokenVerificationComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    protected $gaService: GoogleAnalyticsService,
    private router: Router,
    private _routes: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const token = this._routes.snapshot.paramMap.get('token');

    if (!token) {
      this.tokenVerificationError();
    } else {
      this.verifyToken(token);
    }
  }

  verifyToken(token: string) {
    this._authService.verifyToken(token).subscribe({
      next: (response) => {
        if (response.success === true) {
          this.$gaService.event(
            'register_intent',
            'email_verification',
            'token_verified'
          );

          this._authService.setRegistrationEmail(response.data!);

          this.router.navigate(['../../profile'], {
            relativeTo: this._routes,
            queryParams: {},
          });
        }
      },
      error: () => {
        // Set the error on the form control
        this.tokenVerificationError()
        
      },
    });
  }

  tokenVerificationError() {
    this._snackBar.open(`Oops, we can't verify the token.`, undefined, {
      duration: 2500,
      panelClass: 'snack-error',
    });

    this.$gaService.event(
      'register_intent',
      'email_verification',
      'token_incorrect'
    );

    this.router.navigate(['../../email-verification'], {
      relativeTo: this._routes,
      queryParams: {
        step: 'email-verification',
      },
    });
  }
}
