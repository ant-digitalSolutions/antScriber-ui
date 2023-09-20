import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';
import { WizardCreatorFormComponent } from './components/wizard-creator-form/wizard-creator-form.component';
import { WizardCreatorEditorComponent } from './components/wizard-creator-editor/wizard-creator-editor.component';
import { SharedModule } from '../common/shared.module';
import { WizardCreatorService } from './services/wizard-creator.service';
import { WizardCreatorRoutes } from './wizard-creator.routing';
import { RouterModule } from '@angular/router';



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
  ],
  providers: [WizardCreatorService]
})
export class WizardCreatorModule { }
