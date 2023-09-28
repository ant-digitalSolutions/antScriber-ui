import { Component } from '@angular/core';
import { DialogService } from 'src/app/dialogs/dialog.service';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-home-navbar',
  templateUrl: './document-home-navbar.component.html',
  styleUrls: ['./document-home-navbar.component.scss']
})
export class DocumentHomeNavbarComponent {


  constructor(private _dialogService: DialogService, private _docService: DocumentService) {

  }


  newDocument() {
    this._dialogService.openDialogWithSingleInput('Create New Document', 'Document Name', '', 'Create').afterClosed().subscribe(result => {
      if (result)
        this._docService.create(result, '').subscribe();
    });
  }

  newFolder() {
    this._dialogService.openDialogWithSingleInput('Create New Folder', 'Folder Name', '', 'Create').afterClosed().subscribe(result => {
      if (result)
        this._docService.createFolder(result).subscribe();
    });
  }

}
