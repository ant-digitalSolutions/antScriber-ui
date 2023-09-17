import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaFieldRenderAndEditorComponent } from './components/text-area-field-render-and-editor/text-area-field-render-and-editor.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionFieldRenderAndEditorComponent } from './components/option-field-render-and-editor/option-field-render-and-editor.component';
import { HtmlContentEditorComponent } from './components/html-content-editor/html-content-editor.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgxEditorModule } from 'ngx-editor';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { ContentEditionMagicActionsComponent } from './components/content-edition-magic-actions/content-edition-magic-actions.component';
import { MagicEditionService } from './services/content-magic-edition.service';



@NgModule({
  declarations: [
    TextAreaFieldRenderAndEditorComponent,
    OptionFieldRenderAndEditorComponent,
    HtmlContentEditorComponent,
    ContentEditionMagicActionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    TablerIconsModule.pick(TablerIcons),
    TablerIconsModule,
  ],
  providers: [MagicEditionService],
  exports: [TextAreaFieldRenderAndEditorComponent, OptionFieldRenderAndEditorComponent, HtmlContentEditorComponent]
})
export class SharedModule { }