import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { CoreService } from 'src/app/services/core.service';
import { getBaseApiURL } from 'src/environments/enviroment.dynamic';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  options = this.settings.getOptions();

  hasInvalidCredentials = false;

  appName = environment.appName;

  showForm = true;

  registerWithPass = false;

  emailVerified = false;

  constructor(
    private settings: CoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    protected $gaService: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    if (this._authService.shouldRedirectUserFromRegisterPageToLoginPage()) {
      this._authService.setUserRedirectedFromRegisterPageToLoginPage();
      const queryParams = this.route.snapshot.queryParams;
      this.router.navigate(['/auth/login'], { queryParams });
    }
    this.$gaService.event('register_intent', 'page_on_init', 'register_page');

    this.checkUserStatus();

    this.route.queryParamMap.subscribe(p => {
      if (p.keys.length === 0) {
        this.registerWithPass = false;
      } else {
        this.registerWithPass = true;
      }
    })
  }

  public get bigScreen(): boolean {
    return window.innerWidth > 1200;
  }

  redirectToGoogleSignIn() {
    this._authService.logout_in_silence();

    this.$gaService.event(
      'user_register',
      'third_party_provider',
      'provider_google'
    );
    window.location.href = getBaseApiURL() + 'auth/google';
  }

  redirectToFacebookSignIn() {
    this._authService.logout_in_silence();

    this.$gaService.event(
      'user_register',
      'third_party_provider',
      'provider_facebook'
    );
    window.location.href = getBaseApiURL() + 'auth/facebook';
  }

  redirectToLinkedinSignIn() {
    this._authService.logout_in_silence();
    this.$gaService.event(
      'user_register',
      'third_party_provider',
      'provider_linkedin'
    );
    window.location.href = getBaseApiURL() + 'auth/linkedin';
  }

  continue() {
    this.router.navigate(['/']);
  }

  signUpAsDifferentPerson() {
    this.showForm = true;

    return false;
  }

  checkUserStatus() {
    const queryParams = this.route.snapshot.queryParams;
    const loginForceDisplayForm = queryParams['loginForceDisplayForm'];

    if (this.isLoggedIn) {
      this.showForm = false;
    }
    if (loginForceDisplayForm) {
      this.showForm = true;
    }
  }

  onRegisterWithPass() {
    this.registerWithPass = true;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        step: 'email-verification'
      }
    });
  }

  public get isLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  public get userEmail(): string | null {
    return this._authService.userEmail;
  }
}
