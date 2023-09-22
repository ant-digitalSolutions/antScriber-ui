import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';
import { WizardCreatorFormComponent } from './components/wizard-creator-form/wizard-creator-form.component';
import { WizardCreatorEditorComponent } from './components/wizard-creator-editor/wizard-creator-editor.component';
import { SharedModule } from '../common/shared.module';
import { WizardCreatorService } from './services/wizard-creator.service';
import { WizardCreatorRoutes } from './wizard-creator.routing';
import { RouterModule } from '@angular/router';
import { ContentCreationModule } from '../content-creation/content-creation.module';
import { DocumentModule } from '../document/document.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    WizardCreatorHomeComponent,
    WizardCreatorFormComponent,
    WizardCreatorEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(WizardCreatorRoutes),
    ContentCreationModule,
    DocumentModule,
    CKEditorModule
   
  ],
  providers: [WizardCreatorService]
})
export class WizardCreatorModule { }
