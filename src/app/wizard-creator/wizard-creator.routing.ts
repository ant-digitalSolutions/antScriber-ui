import { Routes } from '@angular/router';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';

export const WizardCreatorRoutes: Routes = [
    {
        path: 'creator',
        children: [
            {
                path: '',
                component: WizardCreatorHomeComponent,
                data: { breadcrumb: { skip: true } }
                
            },
            {
                path: 'doc/:docId',
                component: WizardCreatorHomeComponent,
                data: { breadcrumb: { skip: true } }
            }
        ],
    }
];