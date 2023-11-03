import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { DialogService } from 'src/app/dialogs/dialog.service';
import { DocumentDetailsDto } from '../../dtos/document-details.dto';
import { WizardTableElement } from '../../dtos/wizard-table-element.dto';
import { DocumentService } from '../../services/document.service';
import { DialogForMovingDocComponent } from '../dialog-for-moving-doc/dialog-for-moving-doc.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {


  componentDestroyed$: Subject<boolean> = new Subject();

  documentsToRender: DocumentDetailsDto[] = [];

  tableElementsToRender: WizardTableElement[] = [];


  displayedColumns = ['name', 'words', 'updatedAt', 'isFavorite', 'menuDots'];
  dataSource: MatTableDataSource<WizardTableElement>;

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  pageSize = 1000;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  selectedProjectId: number;

  isMobile = false;
  showAddElementsBtn = true;

  @ViewChild('docsTableInnerContainer') tableInnerContainerRef: ElementRef;
  @ViewChild('docsTableOuterContainer') tableOuterContainerRef: ElementRef;


  constructor(
    private _docService: DocumentService,
    private _projectService: BlogProjectsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _dialogService: DialogService,
    public _matDialog: MatDialog) { }


  ngOnInit(): void {
    this.setListeners();
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile.bind(this), false)
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._docService.wizardTableElements$.pipe(takeUntil(this.componentDestroyed$)).subscribe(elements => {
      if (elements) {
        this.tableElementsToRender = elements;
        this.dataSource = new MatTableDataSource<WizardTableElement>(this.tableElementsToRender);

      }
    });

    this._projectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(pId => {
      if (pId) {
        this.selectedProjectId = pId;
        // TODO: This request is being made multiple times. Remove from other areas of the app and 
        // only request from this point.
        this._docService.listDocsForTable(this.selectedProjectId, this.pageIndex, this.pageSize).subscribe()
      }
    })
  }



  documentRowSelected(tableElement: WizardTableElement) {
    const existingQueryParams = this.activeRoute.snapshot.queryParams;

    const newQueryParams = tableElement.isDocument ?
      {
        ...existingQueryParams,
        docId: tableElement.uuid
      }
      :
      {
        ...existingQueryParams,
        folderId: tableElement.uuid
      };

    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: newQueryParams,
      replaceUrl: true,
    });
  }

  setAsFavorite(tableElement: WizardTableElement): void {
    if (tableElement.isDocument) {
      const docIsFavorite = tableElement.isFavorite!;

      this._docService.setAsFavorite(tableElement.uuid, !docIsFavorite).subscribe(r => {
        if (r.success) {
          const item = this.tableElementsToRender.find(d => d.uuid === tableElement.uuid);

          if (item) {
            item!.isFavorite = !docIsFavorite
          }
        }
      });
    }
  }

  openDeleteDialog(doc: WizardTableElement) {
    const dialogMessage = doc.isDocument ?
      'Are you sure you want to permanently delete this document?' :
      'Are you sure you want to delete this folder and its documents?'
    this._dialogService.openConfirmationDialog({
      okBtnText: 'Yes',
      cancelBtnText: 'No',
      message: dialogMessage
    })
      .afterClosed()
      .subscribe(r => {
        if (r) {
          if (doc.isDocument) {
            this._docService.deleteDoc(doc.uuid).subscribe(r => {
              if (r.success) {
                this.removeElementFromTable(doc.uuid)
              }
            });
          }
          else {
            this._docService.deleteFolder(doc.uuid).subscribe(r => {
              if (r.success) {
                this.removeElementFromTable(doc.uuid);
              }
            })
          }
        }
      })
  }

  openMoveDialog(doc: WizardTableElement) {
    this._docService.listFolders(this.selectedProjectId)
      .subscribe()

    return this._matDialog.open(DialogForMovingDocComponent, {
      data: {
        docToMoveUUId: doc.uuid
      }
    })
      .afterClosed()
      .subscribe(r => {
        if (r) {
          this.removeElementFromTable(doc.uuid);
        }
      })
  }

  openRenameDialog(tableElement: WizardTableElement) {
    this._dialogService.openDialogWithSingleInput_v2(
      {
        title: tableElement.isDocument ? 'Rename Document' : ' Rename Folder',
        labelText: tableElement.isDocument ? 'Document Name' : 'Folder Name',
        value: tableElement.name,
        okBtnText: 'Rename',
        placeholder: tableElement.isDocument ? 'The name for your doc' : 'The name for your Folder'
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (tableElement.isDocument) {
            this._docService.update(tableElement.uuid, { name: result }).subscribe(r => {
              if (r) {
                this.renameTableElement(tableElement.uuid, result)
              }
            });
          } else {
            this._docService.renameFolder(tableElement.uuid, result).subscribe(r => {
              if (r) {
                this.renameTableElement(tableElement.uuid, result)
              }
            });
          }
        }
      });
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

  checkIfMobile() {
    this.isMobile = (window.innerWidth < 960);
    if (this.isMobile) {
      this.displayedColumns = ['name', 'menuDots'];
    }
  }

  onScrollTableInnerScroll() {
    const scrollPosition = this.tableInnerContainerRef.nativeElement.scrollTop;
    const percent = (this.tableInnerContainerRef.nativeElement.scrollHeight - scrollPosition) / this.tableOuterContainerRef.nativeElement.clientHeight;

    if (percent < 1.10) {
      this.showAddElementsBtn = false;
    } else {
      this.showAddElementsBtn = true;
    }
  }

  private removeElementFromTable(elementUUID: string) {
    const index = this.tableElementsToRender.findIndex(d => d.uuid === elementUUID);
    if (index >= 0) {
      this.tableElementsToRender.splice(index, 1);
      this.dataSource = new MatTableDataSource<WizardTableElement>(this.tableElementsToRender);
    }
  }

  private renameTableElement(itemUUID: string, newName: string) {
    const index = this.tableElementsToRender.findIndex(d => d.uuid === itemUUID);
    if (index) {
      this.tableElementsToRender[index].name = newName;
      this.dataSource = new MatTableDataSource<WizardTableElement>(this.tableElementsToRender);
    }
  }
}
