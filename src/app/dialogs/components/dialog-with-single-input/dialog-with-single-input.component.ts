import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCustomData_SingleInput } from '../../dto/dialog-data';

@Component({
  selector: 'app-dialog-with-single-input',
  templateUrl: './dialog-with-single-input.component.html',
  styleUrls: ['./dialog-with-single-input.component.scss']
})
export class DialogWithSingleInputComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogWithSingleInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData_SingleInput,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
