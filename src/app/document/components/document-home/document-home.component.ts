import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-document-home',
  templateUrl: './document-home.component.html',
  styleUrls: ['./document-home.component.scss']
})
export class DocumentHomeComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  documentId: string;



  constructor(private _route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }
  ngOnInit(): void {
// this._route
//       .queryParams
//       .pipe(takeUntil(this.componentDestroyed$))
//       .subscribe(params => {
//         // if (params.has('docId')) {
//         //   this.documentId = params.get('docId')!;
//         // }
//         if (params['docId']) {
//           this.documentId = params['docId'];
//         } else {
//           this.documentId = null;
//         }
//       });
    this._route.paramMap.pipe(takeUntil(this.componentDestroyed$)).subscribe(p => {
      if (p.has('docId')) {
        this.documentId =p.get('docId')!;
      }
    })
  }

}
