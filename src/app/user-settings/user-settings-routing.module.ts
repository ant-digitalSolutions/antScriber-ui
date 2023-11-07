import { Routes } from '@angular/router';
import { UserSettingsBillingComponent } from './components/user-settings-billing/user-settings-billing.component';
import { UserSettingsProfileComponent } from './components/user-settings-profile/user-settings-profile.component';
import { UserSettingsHomeComponent } from './user-settings-home/user-settings-home.component';

export const UserSettingsRoutes: Routes = [
    {
        path: '',
        component: UserSettingsHomeComponent,
        children: [
            {
                path: 'profile',
                component: UserSettingsProfileComponent
            },
            {
                path: 'billing',
                component: UserSettingsBillingComponent
            }
        ],
    }
];