import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { AuthRoutes } from './auth.routing';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterWithEmailComponent } from './components/register-with-email/register-with-email.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';



@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPassComponent,
    LoginComponent,
    RegisterWithEmailComponent,
    EmailVerificationComponent
  ],
  imports: [
    RouterModule.forChild(AuthRoutes),
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class AuthModule { }
