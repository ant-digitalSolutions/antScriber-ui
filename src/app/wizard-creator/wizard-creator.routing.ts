import { Routes } from '@angular/router';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';

export const WizardCreatorRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'creator',
                component: WizardCreatorHomeComponent,
                data: { breadcrumb: { skip: true } }
                
            },
            {
                path: 'creator/doc/:docId',
                component: WizardCreatorHomeComponent,
                data: { breadcrumb: { skip: true } }
            }
        ],
    }
];