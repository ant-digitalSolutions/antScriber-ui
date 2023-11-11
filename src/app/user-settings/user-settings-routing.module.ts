import { Routes } from '@angular/router';
import { CheckoutReturnComponent } from '../payment/components/checkout-return/checkout-return.component';
import { ListPaymentsComponent } from '../payment/components/list-payments/list-payments.component';
import { UserSettingsBillingComponent } from './components/user-settings-billing/user-settings-billing.component';
import { UserSettingsChangePasswordComponent } from './components/user-settings-change-password/user-settings-change-password.component';
import { UserSettingsProfileComponent } from './components/user-settings-profile/user-settings-profile.component';
import { UserSettingsHomeComponent } from './user-settings-home/user-settings-home.component';

export const UserSettingsRoutes: Routes = [
  {
    path: '',
    component: UserSettingsHomeComponent,
    children: [
      {
        path: 'profile',
        component: UserSettingsProfileComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile/password',
        component: UserSettingsChangePasswordComponent,
      },
      //   {
      //     path: 'billing',
      //     component: UserSettingsBillingComponent,
      //   },
      {
        path: 'subscriptions',
        children: [
          {
            path: '',
            component: UserSettingsBillingComponent,
          },
          {
            path: 'checkout-return',
            component: CheckoutReturnComponent,
          },
        ],
      },
      {
        path: 'payments',
        children: [
          {
            path: '',
            component: ListPaymentsComponent,
          }
        ],
      },
    ],
  },
];