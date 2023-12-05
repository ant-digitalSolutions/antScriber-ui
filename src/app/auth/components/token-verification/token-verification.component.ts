import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

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
      this.handleNotFoundError();
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
      error: (error: HttpErrorResponse) => {
        switch (error.status) {
          case 403: // Forbidden
          this._snackBar.open(`It seem this use has already been verified.`, undefined, {
            duration: 2500,
            panelClass: 'snack-error',
          });
            this.router.navigate(['/auth/login']);
            break;
          case 404: // Not Found
            // Handle Not Found error accordingly
            this.handleNotFoundError();
            break;
          default:
            // Set the error on the form control for generic errors
            this.handleNotFoundError();
        }
      },
    });
  }

  handleNotFoundError() {
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
