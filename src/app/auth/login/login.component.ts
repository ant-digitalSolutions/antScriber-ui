import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/user/services/user.service';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  options = this.settings.getOptions();

  hasInvalidCredentials = false;

  isLoading = true;

  appName = environment.appName;

  bigScreen = true;

  renderContent = false;

  loginWithPass = false;

  hidePassword = true;

  constructor(
    private settings: CoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    protected $gaService: GoogleAnalyticsService,
    private _projectService: BlogProjectsService,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkIfMobile();

    if (!this.isLoggedIn) this.checkJwtInQueryParams();
  }

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.email,
    ]),
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
      expiresAt,
    };

    // means this is the first time the user enter the app,
    // so this happens after the user register with 3rd party provider
    if (showInitialTour) {
      this._userService.showInitialTour = true;

      // log that a new was registered
      this.$gaService.event(
        'user_register_done',
        'user_created',
        'third_party_provider'
      );
    }

    if (access_token && expiresAt) {
      // const access_token = JSON.parse(access_token_raw.replace('j:', ''));
      this.authService.setSession(session);

      if (this.authService.isLoggedIn()) {
        this._projectService.refreshProjects().then(() => {
          window.history.replaceState(null, '', '/auth/login');
          this.router.navigateByUrl('/');
        });
        this.$gaService.event(
          'user_login',
          'user_logged_in',
          `provider_${provider}`
        );
      } else {
        this.isLoading = false;
        this.renderContent = true;
      }
    } else {
      this.isLoading = false;
      this.renderContent = true;
    }
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    
    this.isLoading = true;
    const userLogin = {
      email: this.form.value.email!,
      password: this.form.value.password!,
    };
  
    this.authService.login(userLogin).subscribe({
      next: (r) => {
        this.isLoading = false;
        if (r.success) {
          this._projectService.refreshProjects().then(() => {
            this.router.navigateByUrl('/');
          });
          this.$gaService.event('user_login', 'user_logged_in', 'provider_password');
        } 
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.$gaService.event('user_login', 'credential_error');

        if (error.status === 401) {
          this._snackBar.open('Invalid credentials. Please try again.', undefined, {
            duration: 3000,
            panelClass: 'snack-error'
          });
          this.hasInvalidCredentials = true;
        } else {
          // Handle other errors
          this._snackBar.open('An error occurred', undefined, {
            duration: 3000,
            panelClass: 'snack-error'
          });
        }
      }
    });
  }

  redirectToGoogleSignIn() {
    window.location.href = getBaseApiURL() + 'auth/google';
  }

  redirectToFacebookSignIn() {
    window.location.href = getBaseApiURL() + 'auth/facebook';
  }

  redirectToLinkedinSignIn() {
    window.location.href = getBaseApiURL() + 'auth/linkedin';
  }

  checkIfMobile() {
    this.bigScreen = window.innerWidth > 1200;
  }

  continue() {
    this.router.navigate(['/']);
  }

  onHidePassword($event: MouseEvent) {
    $event.stopPropagation();
    this.hidePassword = !this.hidePassword;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public get userEmail(): string | null {
    return this.authService.userEmail;
  }
}
