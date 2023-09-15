import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { KeywordsService } from 'src/app/blogger/services/keywords.service';
import { WebpageService } from '../../services/webpage.service';
import { getWebpageTypeStrings } from '../../enums/webpage-type.enum';
import { WebpageGenerateParams } from '../../dtos/webpage-generator-params.dto';

@Component({
  selector: 'app-webpage-creator',
  templateUrl: './webpage-creator.component.html',
  styleUrls: ['./webpage-creator.component.scss']
})
export class WebpageCreatorComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isLoading = false;

  webpageGeneratorForm: FormGroup;

  webpageData: any;

  webpageTypeOptions: string[];

  constructor
    (private _blogProjectService: BlogProjectsService,
      private _keywordService: KeywordsService,
      private _webpageService: WebpageService) { }


  ngOnInit(): void {
    this.setListeners();
    this.setForm();
    this.webpageTypeOptions = getWebpageTypeStrings();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setForm() {
    this.webpageGeneratorForm = new FormGroup({
      shortDescription: new FormControl('Home page of the website. Contains information about my business, our services and other elements to convince the audience to contact us', [Validators.required, Validators.minLength(50)]),
      pageTitle: new FormControl('Home Page'),
      primaryKeyword: new FormControl(null, [Validators.required]),
      secondaryKeywords: new FormControl(),
      webpageType: new FormControl(),
      addCTA: new FormControl(),
      whatToPromote: new FormControl(''),
    })
  }

  setListeners() {
    this._blogProjectService.selectedProjectId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(projectId => {
      if (projectId && projectId !== -1) {
        this.webpageGeneratorForm.addControl('websiteId', new FormControl(projectId, [Validators.required]))

      }
    })
    this._keywordService.primaryKeywordSelection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(k => {
      this.webpageGeneratorForm.get('primaryKeyword')?.setValue(k);
    })
    this._keywordService.secondaryKeywordSelection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(sKeywords => {
      this.webpageGeneratorForm.get('secondaryKeywords')?.setValue(sKeywords);
    })
  }

  generateWebpageContent() {
    const params = new WebpageGenerateParams(this.webpageGeneratorForm.value);
    this._webpageService.createWebpageOutline(params).subscribe(r => console.log(r.data))
  }

}
