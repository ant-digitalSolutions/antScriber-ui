import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogCustomData_Confirmation } from '../../dto/dialog-custom-data-confirmation';

@Component({
  selector: 'app-dialog-for-message',
  templateUrl: './dialog-for-message.component.html',
  styleUrls: ['./dialog-for-message.component.scss']
})
export class DialogForMessageComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogForMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData_Confirmation,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
