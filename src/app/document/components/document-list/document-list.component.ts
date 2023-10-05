import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil, merge } from 'rxjs';
import { DocumentDetailsDto } from '../../dtos/document-details.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DocumentService } from '../../services/document.service';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WizardTableElement } from '../../dtos/wizard-table-element.dto';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {




  componentDestroyed$: Subject<boolean> = new Subject();

  documentsToRender: DocumentDetailsDto[] = [];

  tableElementsToRender: WizardTableElement[] = [];


  displayedColumns = ['name', 'documentsCount', 'words', 'updatedAt', 'isFavorite', 'menuDots'];
  dataSource: MatTableDataSource<WizardTableElement>;

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  selectedProjectId: number;

  constructor(
    private _docService: DocumentService,
    private _projectService: BlogProjectsService,
    private router: Router,
    private _location: Location,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._docService.wizardTableElements$.pipe(takeUntil(this.componentDestroyed$)).subscribe(elements => {
      if (elements)
{      this.tableElementsToRender = elements;
      this.dataSource = new MatTableDataSource<WizardTableElement>(this.tableElementsToRender);}
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

  /**
 * Set the paginator after the view init since this component will
 * be able to query its view for the initialized paginator.
 */
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  starDoc(_t47: any) {
    throw new Error('Method not implemented.');
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

  setAsFavorite(tableElement: WizardTableElement): void  {
    if (tableElement.isDocument)
    {
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
}
