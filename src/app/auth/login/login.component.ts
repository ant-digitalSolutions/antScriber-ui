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
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { UserService } from 'src/app/user/services/user.service';

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
    private authService: AuthService,
    protected $gaService: GoogleAnalyticsService,
    private _projectService: BlogProjectsService,
    private _userService: UserService) { }

  ngOnInit(): void {
    this.checkIfMobile();

    if (!this.isLoggedIn)
      this.checkJwtInQueryParams();
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  checkJwtInQueryParams() {
    this.isLoading = true;
    const qParams = this.activatedRoute.snapshot.queryParams;

    const access_token = qParams['access_token'];
    const expiresAt = qParams['expires_at'];
    const provider = qParams['provider'];
    const showInitialTour = qParams['showInitialTour'];

    const session = {
      access_token,
      expiresAt
    }

    if (showInitialTour) {
      this._userService.showInitialTour = true;
    }

    if (access_token && expiresAt) {
      // const access_token = JSON.parse(access_token_raw.replace('j:', ''));
      this.authService.setSession(session);

      if (this.authService.isLoggedIn()) {
        this._projectService.refreshProjects().then(() => {
          window.history.replaceState(null, '', '/auth/login')
          this.router.navigateByUrl('/');
        })
        this.$gaService.event('user_login', 'user_logged_in', `provider_${provider}`);
      }
    }
    this.isLoading = false;
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
          this._projectService.refreshProjects().then(() => {
            this.router.navigateByUrl('/');
          })
          this.$gaService.event('user_login', 'user_logged_in', 'provider_password');
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

  continue() {
    this.router.navigate(['/']);
  }

  
  public get isLoggedIn() : boolean {
    return this.authService.isLoggedIn();
  }

  
  public get userEmail() : string | null {
    return this.authService.userEmail;
  }
  
  
}
