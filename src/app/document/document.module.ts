import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService } from './services/document.service';
import { DocumentHomeComponent } from './components/document-home/document-home.component';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentHomeNavbarComponent } from './components/document-home-navbar/document-home-navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';



@NgModule({
  declarations: [
    DocumentHomeComponent,
    DocumentEditorComponent,
    DocumentListComponent,
    DocumentHomeNavbarComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterModule,
    SharedModule
  ],
  providers: [DocumentService],
  exports: [DocumentHomeComponent]
})
export class DocumentModule { }
