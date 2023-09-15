import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WebpageService } from '../../services/webpage.service';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';

@Component({
  selector: 'app-webpage-creator',
  templateUrl: './webpage-creator.component.html',
  styleUrls: ['./webpage-creator.component.scss']
})
export class WebpageCreatorComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  webpageData: WebpageDetailsDto;

  constructor
    (private _blogProjectService: BlogProjectsService,
      private _webpageService: WebpageService) { }


  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._blogProjectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(projectId => {
    
    })
  }
}
