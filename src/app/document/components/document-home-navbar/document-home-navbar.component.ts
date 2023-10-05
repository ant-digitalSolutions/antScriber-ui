import { Component } from '@angular/core';
import { DialogService } from 'src/app/dialogs/dialog.service';
import { DocumentService } from '../../services/document.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-home-navbar',
  templateUrl: './document-home-navbar.component.html',
  styleUrls: ['./document-home-navbar.component.scss']
})
export class DocumentHomeNavbarComponent {

  listFavorites = false;

  constructor(
    private _dialogService: DialogService, 
    private _docService: DocumentService,
    private router: Router,
    private _route: ActivatedRoute) {

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

  goBack() {
    const queryParams = this._route.snapshot.queryParams;

    const newQueryParams = {
      ...queryParams
    };
    newQueryParams['docId'] = null;

    if (queryParams.hasOwnProperty('docId')) {
      newQueryParams['docId'] = null;
    } else {
      newQueryParams['folderId'] = null;
    }

    this.router.navigate([], {
      relativeTo: this._route,
      queryParams: newQueryParams,
      replaceUrl: true,
    });
  }

  showFavorites() {
    this.router.navigate([], {
      relativeTo: this._route,
      queryParams:
      {
        show: 'favorites'
      },
      replaceUrl: true,
    });
    this.listFavorites = true;
  }

  goHome() {
    this.router.navigate([], {
      relativeTo: this._route,
      queryParams:
      {
        folderId: null,
        show: null
      },
      replaceUrl: true,
    });
  }


  public get selectedFoldername(): string | undefined {
    return this._docService.selectedFolderName;
  }

  
  public get showFavoriteElements() : boolean {
    return this._docService.showFavorites;
  }
  


}
