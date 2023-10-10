import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCustomData_SingleInput } from '../../dto/dialog-data';
import { DialogWithSingleInputComponent } from '../dialog-with-single-input/dialog-with-single-input.component';
import { DialogCustomData_Confirmation } from '../../dto/dialog-custom-data-confirmation';

@Component({
  selector: 'app-dialog-for-confirmation',
  templateUrl: './dialog-for-confirmation.component.html',
  styleUrls: ['./dialog-for-confirmation.component.scss']
})
export class DialogForConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogWithSingleInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData_Confirmation,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
