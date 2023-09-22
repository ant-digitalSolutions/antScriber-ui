import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from './services/document.service';
import { DocumentHomeComponent } from './components/document-home/document-home.component';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';
import { DocumentListComponent } from './components/document-list/document-list.component';



@NgModule({
  declarations: [
    DocumentHomeComponent,
    DocumentEditorComponent,
    DocumentListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [DocumentService]
})
export class DocumentModule { }
