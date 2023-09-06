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

  constructor(private settings: CoreService, private router: Router, private authService: AuthService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    const userLogin = {
      email: this.form.value.email!,
      password: this.form.value.password!
    };
    const result = this.authService.login(userLogin).subscribe(
      () => {
        console.log("User is logged in");
        this.router.navigateByUrl('/');
      }
    );
  }
}