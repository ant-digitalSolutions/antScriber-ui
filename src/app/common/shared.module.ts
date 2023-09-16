import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaFieldRenderAndEditorComponent } from './components/text-area-field-render-and-editor/text-area-field-render-and-editor.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionFieldRenderAndEditorComponent } from './components/option-field-render-and-editor/option-field-render-and-editor.component';



@NgModule({
  declarations: [
    TextAreaFieldRenderAndEditorComponent,
    OptionFieldRenderAndEditorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TextAreaFieldRenderAndEditorComponent, OptionFieldRenderAndEditorComponent]
})
export class SharedModule { }
