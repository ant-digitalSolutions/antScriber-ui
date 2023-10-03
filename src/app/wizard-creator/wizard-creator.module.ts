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
import { WizardCreatorFormDynamicElementsComponent } from './components/wizard-creator-form-dynamic-elements/wizard-creator-form-dynamic-elements.component';
import { WizardUseCaseCodingImplementCodeComponent } from './components/use-case-form-components/coding/wizard-use-case-coding-implement-code/wizard-use-case-coding-implement-code.component';
import { WizardUseCaseCodingHomeComponent } from './components/use-case-form-components/coding/wizard-use-case-coding-home.component';
import { WizardCreatorTextFieldComponent } from './components/common/wizard-creator-text-field/wizard-creator-text-field.component';
import { WizardCreatorCheckboxFieldComponent } from './components/common/wizard-creator-checkbox-field/wizard-creator-checkbox-field.component';
import { WizardUseCaseCodingGithubIssueComponent } from './components/use-case-form-components/coding/wizard-use-case-coding-github-issue/wizard-use-case-coding-github-issue.component';
import { WizardCreatorButtonToggleComponent } from './components/common/wizard-creator-button-toggle/wizard-creator-button-toggle.component';



@NgModule({
  declarations: [
    WizardCreatorHomeComponent,
    WizardCreatorFormComponent,
    WizardUseCasesSelectorHomeComponent,
    WizardUseCasesSelectorByGroupComponent,
    WizardCreatorTextFieldComponent,
    WizardCreatorFormDynamicElementsComponent,
    WizardUseCaseCodingHomeComponent,
    WizardUseCaseCodingImplementCodeComponent,
    WizardCreatorCheckboxFieldComponent,
    WizardUseCaseCodingGithubIssueComponent,
    WizardCreatorButtonToggleComponent
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
