import { Routes } from '@angular/router';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';

export const WizardCreatorRoutes: Routes = [
    {
        path: 'creator',
        component: WizardCreatorHomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'creator/ucg/:ucg/uc/:uc',
        component: WizardCreatorHomeComponent,
    }
];