import { Routes } from '@angular/router';
import { WebpageCreatorComponent } from './components/webpage-creator/webpage-creator.component';
import { WebpageInitialFormComponent } from './components/webpage-initial-form/webpage-initial-form.component';

export const WebsiteRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'create-page',
                component: WebpageInitialFormComponent,
            },
            {
                path: 'editor/:id',
                component: WebpageCreatorComponent,
            },
            {
                path: 'editor',
                component: WebpageCreatorComponent,
            }
            
        ],
    }
];