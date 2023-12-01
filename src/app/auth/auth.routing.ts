import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { RegisterWithEmailComponent } from './components/register-with-email/register-with-email.component';
import { TokenVerificationComponent } from './components/token-verification/token-verification.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                pathMatch: 'full'
            },
            {
                path: 'signup',
                component: RegisterComponent,
                pathMatch: 'prefix',
                children: [
                    {
                        path: 'email-verification',
                        component: EmailVerificationComponent
                    },
                    {
                        path: 'token-verification/:token',
                        component: TokenVerificationComponent
                    },
                    {
                        path: 'profile',
                        component: RegisterWithEmailComponent
                    }
                ]
            },
            {
                path: 'forgot-password',
                component: ForgotPassComponent,
            },
        ],
    },
];
