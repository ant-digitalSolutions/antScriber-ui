import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';
import { UserLogin } from '../dtos/login.dto';
import { environment } from 'src/environments/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { CookieService } from 'ngx-cookie-service';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  options = this.settings.getOptions();

  hasInvalidCredentials = false;

  isLoading = false;

  appName = environment.appName;

  bigScreen = true;

  constructor(
    private settings: CoreService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private authService: AuthService, 
    protected $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.checkIfMobile();
    this.checkIfIsLogged();
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  checkIfIsLogged() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');

    const access_token_raw = this.cookieService.get('access_token');
    
    if (access_token_raw)
    {
      const access_token = JSON.parse(access_token_raw.replace('j:', ''));
      this.authService.setSession(access_token);

      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/'])
      }
    }
  }

  submit() {
    this.isLoading = true;
    const userLogin = {
      email: this.form.value.email!,
      password: this.form.value.password!
    };
    const result = this.authService.login(userLogin).subscribe(
      (r) => {
        this.isLoading = false;
        if (r.success) {
          this.router.navigateByUrl('/');
          this.$gaService.event('user_login', 'user_logged_in', 'successful');
        } else {
          this.hasInvalidCredentials = true;
          this.$gaService.event('user_login', 'credential_error', r.error);

        }
      }
    );
  }

  redirectToGoogleSignIn() {
    window.location.href = getBaseApiURL() + 'auth/google'
  }

  redirectToFacebookSignIn() {
    window.location.href = getBaseApiURL() + 'auth/facebook'
  }

  checkIfMobile() {
    this.bigScreen = (window.innerWidth > 1200);
  }
}
