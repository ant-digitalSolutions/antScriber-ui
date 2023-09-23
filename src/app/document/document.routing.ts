import { Routes } from '@angular/router';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';

export const DocumentRouting: Routes = [
    {
        path: '',
        children: [
            {
                path: 'docs',
                component: DocumentEditorComponent,
            }
        ],
    },
];