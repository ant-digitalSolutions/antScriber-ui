import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebpageCreatorComponent } from './components/webpage-creator/webpage-creator.component';
import { WebpageInitialFormComponent } from './components/webpage-initial-form/webpage-initial-form.component';
import { WebpageSectionEditorComponent } from './components/webpage-section-editor/webpage-section-editor.component';
import { WebsiteService } from './services/website.service';
import { WebpageService } from './services/webpage.service';
import { WebpageSectionService } from './services/webpage-section.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgxEditorModule } from 'ngx-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BloggerRouting } from '../blogger/blogger.routing';
import { KeywordsModule } from '../keywords/keywords.module';
import { MaterialModule } from '../material.module';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { WebsiteRouting } from './website.routing';
import { SharedModule } from '../common/shared.module';




@NgModule({
  declarations: [
    WebpageCreatorComponent,
    WebpageInitialFormComponent,
    WebpageSectionEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WebsiteRouting),
    MaterialModule,
    FormsModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    RouterModule.forChild(BloggerRouting),
    MatChipsModule,
    NgxEditorModule,
    TablerIconsModule.pick(TablerIcons),
    TablerIconsModule,
    KeywordsModule,
    SharedModule
  ],
  providers: [
    WebsiteService,
    WebpageService,
    WebpageSectionService
  ]
})
export class WebsiteModule { }
