import { Routes } from '@angular/router';
import { UserSettingsHomeComponent } from './user-settings-home/user-settings-home.component';

export const UserSettingsRoutes: Routes = [
    {
        path: '',
        component: UserSettingsHomeComponent,
        children: [

        ],
    }
];