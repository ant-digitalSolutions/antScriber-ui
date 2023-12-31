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
import { WizardCreatorTextFieldComponent } from './components/common/wizard-creator-text-field/wizard-creator-text-field.component';
import { WizardCreatorCheckboxFieldComponent } from './components/common/wizard-creator-checkbox-field/wizard-creator-checkbox-field.component';
import { WizardCreatorButtonToggleComponent } from './components/common/wizard-creator-button-toggle/wizard-creator-button-toggle.component';
import { WizardCreatorSelectorFieldComponent } from './components/common/wizard-creator-selector-field/wizard-creator-selector-field.component';
import { WizardUseCaseService } from './services/use-case/wizard-use-case.service';
import { WizardFormService } from './services/wizard-form.service';
import { UseCaseDynamicFormElementsComponent } from './components/use-case-dynamic-form-elements/use-case-dynamic-form-elements.component';




@NgModule({
  declarations: [
    WizardCreatorHomeComponent,
    WizardCreatorFormComponent,
    WizardUseCasesSelectorHomeComponent,
    WizardUseCasesSelectorByGroupComponent,
    WizardCreatorTextFieldComponent,
    WizardCreatorCheckboxFieldComponent,
    WizardCreatorButtonToggleComponent,
    WizardCreatorSelectorFieldComponent,
    UseCaseDynamicFormElementsComponent,
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
  providers: [
    WizardCreatorService,
    WizardUseCaseService,
    WizardFormService]
})
export class WizardCreatorModule { }
