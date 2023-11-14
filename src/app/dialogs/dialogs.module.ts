import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogForConfirmationComponent } from './components/dialog-for-confirmation/dialog-for-confirmation.component';
import { DialogWithSingleInputComponent } from './components/dialog-with-single-input/dialog-with-single-input.component';
import { DialogForMessageComponent } from './components/dialog-for-message/dialog-for-message.component';



@NgModule({
  declarations: [
    DialogWithSingleInputComponent,
    DialogForConfirmationComponent,
    DialogForMessageComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
  ]
})
export class DialogsModule { }
