import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  options = this.settings.getOptions();

  form: FormGroup;
  isLoading = false;
  hasInvalidCredentials = false;

  appName = environment.appName;

  constructor(
    private settings: CoreService,
    private router: Router,
    private _authService: AuthService) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const regex = RegExp("(?=.*?[0-9])(?=.*?[#?!@$%^&*-])")
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(regex)]),
      passConfirmation: new FormControl('', [Validators.required]),
      registerCode: new FormControl('', Validators.required)
    }
    );

    this.form.addValidators(this.passMatchValidator(this.form.get('password')!, this.form.get('passConfirmation')!))
  }


  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this._authService.register(this.form.value).subscribe(r => {
        this.isLoading = false;
        if (r.success) {
          this.router.navigate(['/wizard/creator']);

        } else {
          this.hasInvalidCredentials = true;
        }
      })
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
    return this.form.errors &&
      this.form.errors['match_error'] &&
      this.f['password'].value &&
      this.f['passConfirmation'].valid;
  }

}
