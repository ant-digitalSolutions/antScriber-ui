import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { KeywordsService } from 'src/app/blogger/services/keywords.service';
import { WebpageService } from '../../services/webpage.service';
import { getWebpageTypeStrings } from '../../enums/webpage-type.enum';
import { WebpageGenerateParams } from '../../dtos/webpage-generator-params.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-webpage-initial-form',
  templateUrl: './webpage-initial-form.component.html',
  styleUrls: ['./webpage-initial-form.component.scss']
})
export class WebpageInitialFormComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isLoading = false;

  webpageGeneratorForm: FormGroup;

  webpageData: any;

  webpageTypeOptions: string[];

  currentProjectId: number;

  constructor
    (private _keywordService: KeywordsService,
      private _webpageService: WebpageService,
      private router: Router) { }


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
      title: new FormControl('Home Page'),
      primaryKeyword: new FormControl(null, [Validators.required]),
      secondaryKeywords: new FormControl(),
      webpageType: new FormControl(),
      addCTA: new FormControl(),
      audienceInterest: new FormControl(''),
    })
  }

  setListeners() {
    this._keywordService.primaryKeywordSelection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(k => {
      this.webpageGeneratorForm.get('primaryKeyword')?.setValue(k);
    })
    this._keywordService.secondaryKeywordSelection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(sKeywords => {
      this.webpageGeneratorForm.get('secondaryKeywords')?.setValue(sKeywords);
    })
  }

  generateWebpageContent() {
    const params = new WebpageGenerateParams(this.webpageGeneratorForm.value);
    params.blogProjectId = this.currentProjectId;
    this.isLoading = true;
    this._webpageService.createWebpageOutline(params).subscribe(r => {
      this.isLoading = false;
      this.router.navigate(['/websites/editor'])
    })
  }
}
