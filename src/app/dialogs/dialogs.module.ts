import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DialogWithSingleInputComponent } from './components/dialog-with-single-input/dialog-with-single-input.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    DialogWithSingleInputComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ]
})
export class DialogsModule { }
