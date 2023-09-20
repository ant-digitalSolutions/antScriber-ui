import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardCreatorHomeComponent } from './components/wizard-creator-home/wizard-creator-home.component';
import { WizardCreatorFormComponent } from './components/wizard-creator-form/wizard-creator-form.component';
import { WizardCreatorEditorComponent } from './components/wizard-creator-editor/wizard-creator-editor.component';



@NgModule({
  declarations: [
    WizardCreatorHomeComponent,
    WizardCreatorFormComponent,
    WizardCreatorEditorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WizardCreatorModule { }
