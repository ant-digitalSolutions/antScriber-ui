import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Validators } from 'ngx-editor';
import { DialogCustomData_SingleInput } from '../../dto/dialog-data';

@Component({
  selector: 'app-dialog-with-single-input',
  templateUrl: './dialog-with-single-input.component.html',
  styleUrls: ['./dialog-with-single-input.component.scss']
})
export class DialogWithSingleInputComponent implements OnInit {

  form: FormControl;

  constructor(
    public dialogRef: MatDialogRef<DialogWithSingleInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData_SingleInput,
  ) { }

  ngOnInit(): void {
    this.form = new FormControl(null, [Validators.required(), Validators.maxLength(100)])
  }

  ok() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
