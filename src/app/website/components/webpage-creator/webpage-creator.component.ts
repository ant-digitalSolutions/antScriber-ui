import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WebpageService } from '../../services/webpage.service';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';
import { WebpageSectionDto } from '../../dtos/webpage-section.dto';
import { MatListOption } from '@angular/material/list';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { contentTypeOptionFields } from 'src/app/common/enum/content generation/content-type.enum';

@Component({
  selector: 'app-webpage-creator',
  templateUrl: './webpage-creator.component.html',
  styleUrls: ['./webpage-creator.component.scss']
})
export class WebpageCreatorComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  webpageData: WebpageDetailsDto;

  webpageId: number;

  constructor
    (private _blogProjectService: BlogProjectsService,
      private _webpageService: WebpageService,
      private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.setListeners();

    this.webpageId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.webpageId) {
      this._webpageService.getWebpageAllData(this.webpageId).subscribe();
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._blogProjectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(projectId => {

    });

    this._webpageService.webpage$.pipe(takeUntil(this.componentDestroyed$)).subscribe(w => {
      this.webpageData = w;
    })
  }
  
  public get sections() : WebpageSectionDto[] {
    return this.webpageData?.webpageSections ? this.webpageData.webpageSections.sort((a, b) => a.sectionIndex > b.sectionIndex ? 1 : -1) : [];
  }
  
}
