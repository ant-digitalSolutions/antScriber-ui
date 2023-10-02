import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';
import { WizardCreatorFormComponent } from './components/wizard-creator-form/wizard-creator-form.component';
import { SharedModule } from '../common/shared.module';
import { WizardCreatorService } from './services/wizard-creator.service';
import { WizardCreatorRoutes } from './wizard-creator.routing';
import { RouterModule } from '@angular/router';
import { ContentCreationModule } from '../content-creation/content-creation.module';
import { DocumentModule } from '../document/document.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { WizardUseCasesSelectorHomeComponent } from './components/wizard-use-cases-selector-home/wizard-use-cases-selector-home.component';
import { WizardUseCasesSelectorByGroupComponent } from './components/wizard-use-cases-selector-by-group/wizard-use-cases-selector-by-group.component';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    WizardCreatorHomeComponent,
    WizardCreatorFormComponent,
    WizardUseCasesSelectorHomeComponent,
    WizardUseCasesSelectorByGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(WizardCreatorRoutes),
    ContentCreationModule,
    DocumentModule,
    CKEditorModule,
    MatExpansionModule
   
  ],
  providers: [WizardCreatorService]
})
export class WizardCreatorModule { }
