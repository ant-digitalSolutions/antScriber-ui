import { WebpageCreatorComponent } from './../webpage-creator/webpage-creator.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WebpageService } from '../../services/webpage.service';
import { WebpageSectionDto } from '../../dtos/webpage-section.dto';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { ContentTone, contentToneOptionFields } from 'src/app/common/enum/content generation/content-tone.enum';
import { ContentType, contentTypeOptionFields } from 'src/app/common/enum/content generation/content-type.enum';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { WebpageSectionService } from '../../services/webpage-section.service';
import { WebpageSectionCreateDto } from '../../dtos/create-webpage-section-request.dto';

@Component({
  selector: 'app-webpage-section-editor',
  templateUrl: './webpage-section-editor.component.html',
  styleUrls: ['./webpage-section-editor.component.scss']
})
export class WebpageSectionEditorComponent implements OnInit, OnDestroy {



  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  @Input()
  webSection?: WebpageSectionDto;

  @Input() sectionIndex: number;

  @Input() totalSectionsAmount: number;

  contentTypeOptions: OptionField<string>[];

  contentToneOptions: OptionField<string>[];

  sectionGeneratorForm: FormGroup;

  @Input()
  webpageId: number;

  summaryInEdition: boolean;

  constructor
    (private _webpageService: WebpageService,
      private _webpageSectionService: WebpageSectionService) { }


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
    if (this.webSection) {
      this.sectionGeneratorForm = new FormGroup({
        webpageId: new FormControl(this.webSection.webpageId),
        webpageSectionId: new FormControl(this.webSection.id),
        summary: new FormControl(this.webSection.summary, [Validators.required(), Validators.minLength(50)]),
        title: new FormControl(this.webSection.title, [Validators.required(), Validators.minLength(3)]),
        voiceTone: new FormControl(ContentTone.Informative, [Validators.required()]),
        contentType: new FormControl(ContentType.ShortParagraph, [Validators.required()]),
        CTA: new FormControl(false)
      });
      this.summaryInEdition = false;
    } else {
      this.sectionGeneratorForm = new FormGroup({
        webpageId: new FormControl(this.webpageId),
        summary: new FormControl('', [Validators.required(), Validators.minLength(50)]),
        // title: new FormControl(this.webSection.title, [Validators.required(), Validators.minLength(3)]),
        voiceTone: new FormControl(ContentTone.Informative, [Validators.required()]),
        contentType: new FormControl(ContentType.ShortParagraph, [Validators.required()]),
        CTA: new FormControl(false)
      });
      this.summaryInEdition = true;
    }
  }

  setListeners() {
    if (this.webSection) {
      this._webpageSectionService.editedWebpageSection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(section => {
        if (this.webSection!.id === section.id) {
          this.webSection = section;
          this.isLoading = false;
        }
      })
    }
    else {
      this._webpageSectionService.newWebpageSection$.pipe(takeUntil(this.componentDestroyed$)).subscribe(section => {
          this.webSection = section;
          this.isLoading = false;
      })
    }
  }

  setSummaryText(summary: string) {
    if (this.webSection)
      this.webSection.summary = summary;
    this.sectionGeneratorForm.get('summary')?.setValue(summary);
  }


  setContentOptions() {
    this.contentToneOptions = contentToneOptionFields();
  }

  changeContentType(contentType: string) {
    this.sectionGeneratorForm.get('contentType')?.setValue(contentType);

  }
  changeContentTone(voiceTone: string) {
    this.sectionGeneratorForm.get('voiceTone')?.setValue(voiceTone);
  }

  generateContent() {
    if (this.sectionGeneratorForm.valid)
     {
       this._webpageSectionService.generateWebpageSection(this.sectionGeneratorForm.value).subscribe();
      this.isLoading = true;

      }
  }

  
  public get summaryFieldValidators() : any {
    return [Validators.required, Validators.minLength(20), Validators.maxLength(100)]
  }
  
}