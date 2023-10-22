import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';
import { UserLogin } from '../dtos/login.dto';
import { environment } from 'src/environments/environment';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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

  constructor(private settings: CoreService, private router: Router, private authService: AuthService, protected $gaService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.checkIfMobile();
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6), Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
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

  checkIfMobile() {
    this.bigScreen = (window.innerWidth > 1200);
  }
}
