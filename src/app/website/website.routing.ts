import { Routes } from '@angular/router';
import { WebpageCreatorComponent } from './components/webpage-creator/webpage-creator.component';

export const WebsiteRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'create-page',
                component: WebpageCreatorComponent,
            }
            
        ],
    }
];