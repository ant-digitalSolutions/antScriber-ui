import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoginComponent } from './login/login.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'forgot-password',
                component: ForgotPassComponent,
            },
        ],
    },
];
