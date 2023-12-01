import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  code = ['', '', '', ''];
  codeInputs: ElementRef[] = [];
  @ViewChild('input1') input1: ElementRef;
  @ViewChild('input2') input2: ElementRef;
  @ViewChild('input3') input3: ElementRef;
  @ViewChild('input4') input4: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.verificationCodeForm = this.formBuilder.group({
      verificationCode: ['', Validators.required],
    });

    this.codeInputs.push(this.input1, this.input2, this.input3, this.input4);
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.spinner.show();

      this.authService
        .sendEmailVerification(this.emailForm.value.email)
        .subscribe(() => {
          this.isCodeSent = true;
          this.isLoading = false;
          this.spinner.hide()
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
        .verifyCode(this.emailForm.value.email, verificationCode)
        .subscribe({
          next: (response) => {
            if (response.success === true) {
              this.codeVerifiedEvent.emit(true);
            }
            this.spinner.hide();
          },
          error: () => {
            // Set the error on the form control
            this.verificationCodeForm.controls['verificationCode'].setErrors({
              incorrectCode: true,
            });
            this.spinner.hide();
          },
        });
    }
  }
}
