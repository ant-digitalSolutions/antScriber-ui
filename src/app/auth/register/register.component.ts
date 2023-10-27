import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';

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
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    protected $gaService: GoogleAnalyticsService) { }


  ngOnInit(): void {
    if (this._authService.shouldRedirectUserFromRegisterPageToLoginPage()) {
      this._authService.setUserRedirectedFromRegisterPageToLoginPage();
      const queryParams = this.route.snapshot.queryParams;
      this.router.navigate(['/auth/login'], { queryParams });
    }
    this.initForm();
    this.$gaService.event('user_initialization', 'page_on_init', 'register_page');
    this.initGoogle();
  }

  initGoogle() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "977644342225-rqall5tsjucmaahqs9oa4boj6vo7alnd.apps.googleusercontent.com",
      callback: this.onSignGoogleIn.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => { });
  }

  initForm() {
    const regex = RegExp("(?=.*?[0-9])(?=.*?[#?!@$%^&*-])")
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50), Validators.pattern(regex)]),
      passConfirmation: new FormControl('', [Validators.required])
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
          this.$gaService.event('user_initialization', 'user_created', 'successful');

        } else {
          this.hasInvalidCredentials = true;
          this.$gaService.event('user_initialization', 'user_register_invalid_request', r.error);

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

  onSignGoogleIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }


  public get bigScreen(): boolean {
    return (window.innerWidth > 1200);
  }



  public get passMatchError(): boolean {
    return this.form.errors &&
      this.form.errors['match_error'] &&
      this.f['password'].value &&
      this.f['passConfirmation'].valid;
  }

  redirectToGoogleSignIn() {
    window.location.href = getBaseApiURL() + 'auth/google'
  }

  redirectToFacebookSignIn() {
    window.location.href = getBaseApiURL() + 'auth/facebook'
  }

}

function onSignGoogleIn(googleUser: any) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
