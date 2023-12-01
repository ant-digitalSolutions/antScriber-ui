import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent {
  emailForm: FormGroup;
  verificationCodeForm: FormGroup;
  isCodeSent = false;
  @Output() codeVerifiedEvent = new EventEmitter<boolean>();
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.verificationCodeForm = this.formBuilder.group({
      verificationCode: ['', Validators.required],
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.isLoading = true;

      this.authService
        .sendEmailVerification(this.emailForm.value.email)
        .subscribe(() => {
          this.isCodeSent = true;
          this.isLoading = false;
        });
    }
  }

  verifyCode() {
    this.verificationCodeForm.controls['verificationCode'].setErrors(null); // Reset errors
    if (this.verificationCodeForm.valid) {
      this.authService
        .verifyCode(
          this.emailForm.value.email,
          this.verificationCodeForm.value.verificationCode
        )
        .subscribe({
          next: (response) => {
            if (response.success === true) {
              this.codeVerifiedEvent.emit(true);
            }
          },
          error: (err) => {
            if (err.status === 403) {
              // Set the error on the form control
              this.verificationCodeForm.controls['verificationCode'].setErrors({
                incorrectCode: true,
              });
            }
          },
        });
    }
  }
}
