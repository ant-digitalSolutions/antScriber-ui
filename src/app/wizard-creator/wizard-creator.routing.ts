import { Routes } from '@angular/router';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';

export const WizardCreatorRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'create',
                component: WizardCreatorHomeComponent,
            }
        ],
    }
];