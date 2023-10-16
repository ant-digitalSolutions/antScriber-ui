import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';
import { UserLogin } from '../dtos/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  options = this.settings.getOptions();

  hasInvalidCredentials = false;

  isLoading = true;

  constructor(private settings: CoreService, private router: Router, private authService: AuthService) { }

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
        } else {
          this.hasInvalidCredentials = true;
        }
      }
    );
  }
}
