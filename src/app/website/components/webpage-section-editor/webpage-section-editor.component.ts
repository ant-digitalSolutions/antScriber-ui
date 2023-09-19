import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogProjectsService } from 'src/app/blogger/services/blog-projects.service';
import { WebpageDetailsDto } from '../../dtos/webpage-details.dto';
import { WebpageService } from '../../services/webpage.service';
import { WebpageSectionDto } from '../../dtos/webpage-section.dto';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { ContentTone, contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { ContentType, contentTypeOptionFields } from 'src/app/common/enum/content generation/content-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-webpage-section-editor',
  templateUrl: './webpage-section-editor.component.html',
  styleUrls: ['./webpage-section-editor.component.scss']
})
export class WebpageSectionEditorComponent implements OnInit, OnDestroy {



  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  @Input()
  webSection: WebpageSectionDto;

  @Input() sectionIndex: number;

  @Input() totalSectionsAmount: number;

  contentTypeOptions: OptionField<string>[];

  contentToneOptions: OptionField<string>[];

  sectionGeneratorForm: FormGroup;

  constructor
    (private _webpageService: WebpageService) { }


  ngOnInit(): void {
    this.setListeners();

    this.setContentOptions();

    this.setForm();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setForm() {
    this.sectionGeneratorForm = new FormGroup({
      webpageId: new FormControl(this.webSection.webpageId),
      webpageSectionId: new FormControl(this.webSection.id),
      summary: new FormControl(this.webSection.summary, [Validators.required(), Validators.minLength(50)]),
      title: new FormControl(this.webSection.title, [Validators.required(), Validators.minLength(3)]),
      voiceTone: new FormControl(ContentTone.Informative, [Validators.required()]),
      contentType: new FormControl(ContentType.ShortParagraph, [Validators.required()]),
      CTA: new FormControl(false)
    })
  }

  setListeners() {
    this._webpageService.editedWebpageSection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(section => {
      if (this.webSection.id === section.id) {
        this.webSection = section;
        this.isLoading = false;
      }
    })
  }

  setSummaryText(summary: string) {
    this.webSection.summary = summary;
    this.sectionGeneratorForm.get('summary')?.setValue(summary);
  }


  setContentOptions() {
    this.contentToneOptions = contentToneOptionFields();
    this.contentTypeOptions = contentTypeOptionFields();
  }

  changeContentType(contentType: string) {
    this.sectionGeneratorForm.get('contentType')?.setValue(contentType);

  }
  changeContentTone(voiceTone: string) {
    this.sectionGeneratorForm.get('voiceTone')?.setValue(voiceTone);
  }

  generateContent() {
    this.isLoading = true;
    if (this.sectionGeneratorForm.valid)
      this._webpageService.generateWebpageSection(this.sectionGeneratorForm.value).subscribe();
  }


  
  public get showNext() : boolean {
    return this.sectionIndex < this.totalSectionsAmount;
  }

  
  public get showPrevious() : boolean {
    return this.sectionIndex > 0;
  }
  
  
}