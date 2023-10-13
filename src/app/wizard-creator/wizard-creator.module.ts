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
import { WizardUseCaseGeneralWritingFormComponent } from './components/use-case-form-components/general-writing/wizard-use-case-general-writing-form.component';
import { WizardUseCaseGeneralWritingFormMessageComponent } from './components/use-case-form-components/general-writing/wizard-use-case-general-writing-form-message/wizard-use-case-general-writing-form-message.component';
import { WizardCreatorSelectorFieldComponent } from './components/common/wizard-creator-selector-field/wizard-creator-selector-field.component';
import { WizardUseCaseService } from './services/use-case/wizard-use-case.service';
import { WizardFormService } from './services/wizard-form.service';
import { UseCaseFormBaseComponent } from './components/use-case-form-components/use-case-form-base/use-case-form-base.component';
import { WizardUseCaseInternalCustomComponentComponent } from './components/use-case-form-components/interal-dev/children/wizard-use-case-internal-custom-component.component';
import { WizardUseCaseInternalDevFormComponent } from './components/use-case-form-components/interal-dev/wizard-use-case-internal-dev-form.component';
import { WizardUseCaseMarketingComponent } from './components/use-case-form-components/marketing/wizard-use-case-marketing.component';
import { WizardUseCaseGoogleAdsTitleComponent } from './components/use-case-form-components/marketing/children/wizard-use-case-google-ads.component';
import { WizardUseCaseFacebookAdsComponent } from './components/use-case-form-components/marketing/children/wizard-use-case-facebook-ads.component';
import { WizardUseCaseEmailComponent } from './components/use-case-form-components/marketing/children/wizard-use-case-email.component';
import { WizardUseCaseMarketingSmsComponent } from './components/use-case-form-components/marketing/children/wizard-use-case-marketing-sms.component';
import { WizardUseCaseSocialComponent } from './components/use-case-form-components/social/wizard-use-case-social.component';
import { WizardUseCaseSocialInstagramComponent } from './components/use-case-form-components/social/use-cases/wizard-use-case-social-instagram.component';
import { WizardUseCaseSocialLinkedinComponent } from './components/use-case-form-components/social/use-cases/wizard-use-case-social-linkedin.component';
import { WizardUseCaseSocialTweetComponent } from './components/use-case-form-components/social/use-cases/wizard-use-case-social-tweet.component';
import { WizardUseCaseWebsiteComponent } from './components/use-case-form-components/websites/wizard-use-case-website.component';
import { WizardUseCaseWebsitesSectionCopyComponent } from './components/use-case-form-components/websites/use-cases/wizard-use-case-websites-section-copy.component';
import { WizardUseCaseWebsitesWebpageOutlineComponent } from './components/use-case-form-components/websites/use-cases/wizard-use-case-websites-webpage-outline.component';
import { WizardUseCaseWebsitesSeoComponent } from './components/use-case-form-components/websites/use-cases/wizard-use-case-websites-seo.component';




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
    WizardCreatorButtonToggleComponent,
    WizardUseCaseGeneralWritingFormComponent,
    WizardUseCaseGeneralWritingFormMessageComponent,
    WizardCreatorSelectorFieldComponent,
    UseCaseFormBaseComponent,
    WizardUseCaseInternalCustomComponentComponent,
    WizardUseCaseInternalDevFormComponent,
    WizardUseCaseMarketingComponent,
    WizardUseCaseGoogleAdsTitleComponent,
    WizardUseCaseFacebookAdsComponent,
    WizardUseCaseEmailComponent,
    WizardUseCaseMarketingSmsComponent,
    WizardUseCaseSocialInstagramComponent,
    WizardUseCaseSocialComponent,
    WizardUseCaseSocialLinkedinComponent,
    WizardUseCaseSocialTweetComponent,
    WizardUseCaseWebsiteComponent,
    WizardUseCaseWebsitesSectionCopyComponent,
    WizardUseCaseWebsitesWebpageOutlineComponent,
    WizardUseCaseWebsitesSeoComponent
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
