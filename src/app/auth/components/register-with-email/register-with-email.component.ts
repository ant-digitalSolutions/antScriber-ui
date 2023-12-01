import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-with-email',
  templateUrl: './register-with-email.component.html',
  styleUrls: ['./register-with-email.component.scss'],
})
export class RegisterWithEmailComponent implements OnInit {
  hasInvalidCredentials: boolean;
  form: FormGroup;
  isLoading: boolean = false;

  hidePassword = true;

  constructor(
    private _authService: AuthService,
    protected $gaService: GoogleAnalyticsService,
    private _projectService: BlogProjectsService,
    private router: Router,
    private _routes: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (!this._authService.registrationUserEmail) {
      this.router.navigate(['../email-verification'], {
        relativeTo: this._routes,
        queryParams: {
          step: 'email-verification',
        },
      });
    }
  }

  initForm() {
    const regex = RegExp('(?=.*?[0-9])(?=.*?[#?!@$%^&*-])');
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl(
        { value: this._authService.registrationUserEmail, disabled: true },
         [Validators.required, Validators.email] 
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.pattern(regex),
      ]),
      passConfirmation: new FormControl('', [Validators.required]),
    });

    this.form.addValidators(
      this.passMatchValidator(
        this.form.get('password')!,
        this.form.get('passConfirmation')!
      )
    );
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const userData = this.form.value;
    userData.email = this.form.get('email')?.value;
    if (this.form.valid) {
      this.isLoading = true;
      this._authService.logout_in_silence();
      this._authService.register(userData).subscribe((r) => {
        this.isLoading = false;
        if (r.success) {
          this._projectService.refreshProjects().then(() => {
            this.router.navigateByUrl('/');
          });
          this.$gaService.event(
            'user_register',
            'user_created',
            'provider_pass'
          );
        } else {
          this.hasInvalidCredentials = true;
          this.$gaService.event(
            'user_initialization_failed',
            'user_register_invalid_request',
            r.error
          );
        }
      });
    }
  }

  passMatchValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Passwords does not match' };
      return null;
    };
  }

  public get passMatchError(): boolean {
    return (
      this.form.errors &&
      this.form.errors['match_error'] &&
      this.f['password'].value &&
      this.f['passConfirmation'].valid
    );
  }
}
