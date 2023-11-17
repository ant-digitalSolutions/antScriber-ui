import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { NgxEditorModule } from 'ngx-editor';
import { TimeagoModule } from 'ngx-timeago';
import { DialogsModule } from '../dialogs/dialogs.module';
import { MaterialModule } from '../material.module';
import { ContentEditionMagicActionsComponent } from './components/content-edition-magic-actions/content-edition-magic-actions.component';
import { HtmlContentEditorComponent } from './components/html-content-editor/html-content-editor.component';
import { OptionFieldRenderAndEditorComponent } from './components/option-field-render-and-editor/option-field-render-and-editor.component';
import { TextAreaFieldRenderAndEditorComponent } from './components/text-area-field-render-and-editor/text-area-field-render-and-editor.component';
import { RowChangeDetectorDirective } from './directives/row-change-detector.directive';
import { CacheService } from './services/cache/cache.service';
import { LocalStorageCacheService } from './services/cache/local-storage-cache.service';
import { MagicEditionService } from './services/content-magic-edition.service';



@NgModule({
  declarations: [
    TextAreaFieldRenderAndEditorComponent,
    OptionFieldRenderAndEditorComponent,
    HtmlContentEditorComponent,
    ContentEditionMagicActionsComponent,
    RowChangeDetectorDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    TablerIconsModule.pick(TablerIcons),
    TablerIconsModule,
    TimeagoModule,
    DialogsModule
  ],
  providers: [
    MagicEditionService, 
    LocalStorageCacheService,
  CacheService
],
  exports: [
    TextAreaFieldRenderAndEditorComponent,
    OptionFieldRenderAndEditorComponent,
    HtmlContentEditorComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule
  ]
})
export class SharedModule { }
