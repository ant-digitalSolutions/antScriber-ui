import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  emailForm: FormGroup;
  verificationCodeForm: FormGroup;
  isCodeSent = false;
  @Output() codeVerifiedEvent = new EventEmitter<boolean>();
  isLoading: boolean;

  componentDestroyed$: Subject<boolean> = new Subject();

  code = ['', '', '', ''];
  codeInputs: ElementRef[] = [];
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    protected $gaService: GoogleAnalyticsService,
    private _routes: ActivatedRoute,
    private _router: Router
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.verificationCodeForm = this.formBuilder.group({
      verificationCode: ['', Validators.required],
    });

    this.codeInputs.push(this.input1, this.input2, this.input3, this.input4);
  }

  ngOnInit(): void {
    this._routes.queryParamMap
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((params) => {
        const step = params.get('step') ? params.get('step') : '';
        if (step === 'email-verification') {
          this.isCodeSent = false;
          return;
        }

        if (step === 'code-verification') {
          if (this.userEmail == '') {
            this._router.navigate([], {
              relativeTo: this._routes,
              queryParams: {
                step: 'email-verification',
              },
            });
          }
          this.isCodeSent = true;
          setTimeout(() => {
            (document.querySelector('.input1') as HTMLInputElement)?.focus();
          }, 200);
          return;
        }
      });
  }

  ngAfterViewInit(): void {
    // (document.querySelector('.email-input') as HTMLInputElement)?.focus();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.spinner.show();
      this._snackBar.open('Code sent, please check your email', undefined, {
        duration: 2000,
        panelClass: 'snack-success',
      });
      this.$gaService.event(
        'register_intent',
        'email_verification',
        'send_email'
      );

      this.authService
        .sendEmailVerification(this.emailForm.value.email)
        .subscribe(() => {
          this.isCodeSent = true;
          this.isLoading = false;
          this.spinner.hide();
          this.authService.setRegistrationEmail(this.emailForm.value.email);

          this._router.navigate([], {
            relativeTo: this._routes,
            queryParams: {
              step: 'code-verification',
            },
          });
        });
    }
  }

  onCodeChange(index: number, event: any) {
    let char = event.target.value;

    if (char.length === 1 && /\d/.test(char)) {
      this.code[index] = char;
      if (index < 3) {
        const nextInputClass = `.input${index + 2}`;
        const nextInput = document.querySelector(
          nextInputClass
        ) as HTMLInputElement;
        nextInput?.focus();
      } else if (index === 3) {
        this.verifyCode();
      }
    } else {
      // Replace the content of the input if it's not a number
      event.target.value = '';
    }
  }

  verifyCode() {
    const verificationCode = this.code.join('');
    let isValid = verificationCode.length === 4;

    if (isValid) {
      this.spinner.show();
      this.authService
        .verifyCode(this.userEmail!, verificationCode)
        .subscribe({
          next: (response) => {
            if (response.success === true) {
              this.$gaService.event(
                'register_intent',
                'email_verification',
                'code_verified'
              );

              this._router.navigate(['../profile'], {
                relativeTo: this._routes,
                queryParams: {},
              });
            }
            this.spinner.hide();
          },
          error: () => {
            // Set the error on the form control
            this.verificationCodeForm.controls['verificationCode'].setErrors({
              incorrectCode: true,
            });
            this.spinner.hide();
            for (let i = 0; i < this.code.length; i++) {
              this.code[i] = '';
            }
            (document.querySelector('.input1') as HTMLInputElement)?.focus();
            this.$gaService.event(
              'register_intent',
              'email_verification',
              'code_incorrect'
            );
          },
        });
    }
  }

  public get userEmail(): string | null {
    return this.authService.registrationUserEmail ? this.authService.registrationUserEmail : '';
  }
}
