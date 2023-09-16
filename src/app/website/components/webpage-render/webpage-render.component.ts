import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';
import { WebpageSectionDto } from '../../dtos/webpage-section.dto';
import { WebpageService } from '../../services/webpage.service';

@Component({
  selector: 'app-webpage-render',
  templateUrl: './webpage-render.component.html',
  styleUrls: ['./webpage-render.component.scss']
})
export class WebpageRenderComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  webpageData: WebpageDetailsDto;

  pageSections: WebpageSectionDto[];

  constructor
    ( private _webpageService: WebpageService) { }

  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._webpageService.webpage$.pipe(takeUntil(this.componentDestroyed$)).subscribe(w => {
      this.webpageData = w;
      this.pageSections = this.webpageData?.webpageSections ? this.webpageData.webpageSections.sort((a, b) => a.sectionIndex > b.sectionIndex ? 1 : -1) : [];
    })
    this._webpageService.editedWebpageSection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(editedS => {
      const index = this.pageSections.findIndex(s => s.id === editedS.id)!;
      this.pageSections[index] = editedS;
    })
  }
}
