import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar, protected $gaService: GoogleAnalyticsService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
            this._snackBar.open(`Oops, please try gain.`, undefined, {
              duration: 4000,
              panelClass: 'snack-error'
            });
            this.$gaService.event('client_exception', error.error.message)
          } else {
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;

            this._snackBar.open(`Oops, we have an error. Please try again.`, undefined, {
              duration: 4000,
              panelClass: 'snack-error'
            });

            this.$gaService.event('server_exception', error.status.toString(), error.message, -1, undefined, {
              url: error.url
            })
          }
          return throwError(() => new Error(errorMsg));
        })
      )
  }
}
