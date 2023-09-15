import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebpageCreatorComponent } from './components/webpage-creator/webpage-creator.component';
import { WebpageInitialFormComponent } from './components/webpage-initial-form/webpage-initial-form.component';
import { WebpageSectionEditorComponent } from './components/webpage-section-editor/webpage-section-editor.component';
import { WebsiteService } from './services/website.service';
import { WebpageService } from './services/webpage.service';
import { WebpageSectionService } from './services/webpage-section.service';



@NgModule({
  declarations: [
    WebpageCreatorComponent,
    WebpageInitialFormComponent,
    WebpageSectionEditorComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    WebsiteService,
    WebpageService,
    WebpageSectionService
  ]
})
export class WebsiteModule { }
