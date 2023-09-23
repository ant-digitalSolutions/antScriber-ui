import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DocumentDetailsDto } from '../../dtos/document-details.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DocumentService } from '../../services/document.service';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, OnDestroy {




  componentDestroyed$: Subject<boolean> = new Subject();

  documentsToRender: DocumentDetailsDto[] = [];


  displayedColumns = ['name', 'words', 'updatedAt', 'isFavorite', 'menuDots'];
  dataSource: MatTableDataSource<DocumentDetailsDto>;

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
    this._docService.docsList$.pipe(takeUntil(this.componentDestroyed$)).subscribe(docs => {
      this.documentsToRender = docs;
      this.dataSource = new MatTableDataSource<DocumentDetailsDto>(this.documentsToRender);
    });

    this._projectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(pId => {
      this.selectedProjectId = pId;
      this._docService.listDocsForTable(this.selectedProjectId, this.pageIndex, this.pageSize).subscribe()
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

  documentRowSelected(doc: DocumentDetailsDto) {
    // this._location.go(`wizard/creator?docId=${doc.uuid}`)
    this.router.navigate([`./doc/${doc.uuid}`], {relativeTo: this.activeRoute});
  }
}
