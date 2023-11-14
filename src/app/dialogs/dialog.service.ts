import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogForConfirmationComponent } from './components/dialog-for-confirmation/dialog-for-confirmation.component';
import { DialogForMessageComponent } from './components/dialog-for-message/dialog-for-message.component';
import { DialogWithSingleInputComponent } from './components/dialog-with-single-input/dialog-with-single-input.component';
import { DialogCustomData_Confirmation } from './dto/dialog-custom-data-confirmation';
import { DialogCustomData_SingleInput } from './dto/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  _dialogResult = new Subject<any>();
  dialogResult$ = this._dialogResult.asObservable();

  constructor(public dialog: MatDialog) { }

  /**
   * Opens a dialog that contain a text input
   * 
   * THe text of the dialog is customizable for the user.
   * 
   * It return the dialogRef which contains the data and methods
   * for the created dialog. To get the result: dialog.afterClosed().subscribe(result =>)
   *
   * @param {string} title
   * @param {string} placeholder
   * @param {string} labelText
   * @param {string} okBtnText
   * @return {*}  {MatDialogRef<any, any>}
   * @memberof DialogService
   */
  openDialogWithSingleInput(title: string, placeholder: string, labelText: string, okBtnText: string): MatDialogRef<any, any> {
    const dialogRef = this.dialog.open(DialogWithSingleInputComponent, {
      data: { 
        title,
        placeholder,
        labelText,
        okBtnText
       },
    });

    return dialogRef;

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this._dialogResult.next(result);
    // });
  }

  /**
   * Opens a dialog that contain a text input
   * 
   * THe text of the dialog is customizable for the user.
   * 
   * It return the dialogRef which contains the data and methods
   * for the created dialog. To get the result: dialog.afterClosed().subscribe(result =>)
   *
   * @param {string} title
   * @param {string} placeholder
   * @param {string} labelText
   * @param {string} okBtnText
   * @return {*}  {MatDialogRef<any, any>}
   * @memberof DialogService
   */
  openDialogWithSingleInput_v2(dialogData: DialogCustomData_SingleInput): MatDialogRef<any, any> {
    const dialogRef = this.dialog.open(DialogWithSingleInputComponent, {
      data: dialogData,
    });

    return dialogRef;

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this._dialogResult.next(result);
    // });
  }

  openConfirmationDialog(data: DialogCustomData_Confirmation): MatDialogRef<any, any> {
    return this.dialog.open(DialogForConfirmationComponent, {
      data
    })
  }

  openMessageDialog(data: DialogCustomData_Confirmation): MatDialogRef<any, any> {
    return this.dialog.open(DialogForMessageComponent, {
      data,
      width: '350px'
    })
  }
}
