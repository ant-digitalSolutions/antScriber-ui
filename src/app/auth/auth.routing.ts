import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';
import { RegisterWithEmailComponent } from './components/register-with-email/register-with-email.component';

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
                pathMatch: 'full',
            },
            {
                path: 'signup/profile',
                component: RegisterWithEmailComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPassComponent,
            },
        ],
    },
];
