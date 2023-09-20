import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';
import { WebpageSectionDto } from '../../dtos/webpage-section.dto';
import { WebpageService } from '../../services/webpage.service';
import { WebpageSectionService } from '../../services/webpage-section.service';

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

  pageSectionIsSaving: {sectionId: number, isSaving: boolean}[] = [];

  showSectionCreator = false;

  constructor
    ( private _webpageService: WebpageService,
      private _webpageSectionService: WebpageSectionService) { }

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
      this.pageSections.forEach(section => {
        this.pageSectionIsSaving.push({
          sectionId: section.id,
          isSaving: false
        })
      });
    })
    this._webpageSectionService.editedWebpageSection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(editedS => {
      const index = this.pageSections.findIndex(s => s.id === editedS.id)!;
      this.pageSections[index] = editedS;
      this.pageSectionIsSaving.push({
        isSaving: false,
        sectionId: editedS.id
      })
    });

    this._webpageSectionService.newWebpageSection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(newS => {
      this.pageSections.push(newS);
      this.showSectionCreator = false;
    });
  }

  updateEditedContent(editedContent: string, section: WebpageSectionDto) {
    section.content = editedContent;
    const sectionIndex = this.pageSectionIsSaving.findIndex(s => s.sectionId === section.id);
    this.pageSectionIsSaving[sectionIndex].isSaving = true;
    this._webpageSectionService.updateWebpageSection(section).subscribe(r => {
      this.pageSectionIsSaving[sectionIndex].isSaving = false;
    })
  }

  
  public get webpageId() : number {
    return this.webpageData.id!;
  }
  
}
