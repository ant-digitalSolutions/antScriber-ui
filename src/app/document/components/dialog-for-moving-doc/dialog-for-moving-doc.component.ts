import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogWithSingleInputComponent } from '../../../dialogs/components/dialog-with-single-input/dialog-with-single-input.component';
import { DialogCustomData_MoveDoc } from '../../../dialogs/dto/dialog-custom-data-move-doc';
import { DocumentService } from '../../services/document.service';
import { Subject, takeUntil } from 'rxjs';
import { OptionField } from 'src/app/common/dto/option-field.dto';

@Component({
  selector: 'app-dialog-for-moving-doc',
  templateUrl: './dialog-for-moving-doc.component.html',
  styleUrls: ['./dialog-for-moving-doc.component.scss']
})
export class DialogForMovingDocComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = true;

  folderOptions: OptionField<string>[];

  selectedFolder: string;

  constructor(
    public dialogRef: MatDialogRef<DialogWithSingleInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData_MoveDoc,
    private _docService: DocumentService
  ) { }


  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._docService.availableFolders$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(folders => {
        if (folders) {
          this.folderOptions = folders!.map(f => {
            return {
              value: f.uuid,
              text: f.name
            }
          })

          this.isLoading = false;
        }
        
      })
  }

  moveDocument() {
    this._docService.moveDocToNewFolder(this.data.docToMoveUUId, this.selectedFolder).subscribe(r => {
      if (r.success) {
        this.dialogRef.close(true);
      }
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
