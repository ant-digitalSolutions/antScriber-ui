import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { KeywordDetailsDto } from '../../dto/keywords/keyword-details.dto';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { KeywordsService } from '../../services/keywords.service';

@Component({
  selector: 'app-secondary-keywords-selector',
  templateUrl: './secondary-keywords-selector.component.html',
  styleUrls: ['./secondary-keywords-selector.component.scss']
})
export class SecondaryKeywordsSelectorComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  isLoading = false;

  @Input()
  keywords: KeywordDetailsDto[] = [];
  secondaryKeywordsSearchResult: KeywordDetailsDto[] = [];
  sKeywordCtrl = new FormControl();

  @ViewChild('keywordInput', { static: false }) keywordInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private keywordsService: KeywordsService) {

  }

  ngOnInit(): void {
    this.keywordsService.keywordSearchResult$.pipe(takeUntil(this.componentDestroyed$)).subscribe(keywords => {
      this.secondaryKeywordsSearchResult = this.filterResultList(keywords);
    })

    this.sKeywordCtrl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.keywordsService.listKeywordsByTerm(query))
    ).subscribe(r => {
      this.matAutocomplete.showPanel
    })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  addKeyword(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        const keyword = this.secondaryKeywordsSearchResult.filter(k => k.name === value)[0];
        this.keywords.push(keyword);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.sKeywordCtrl.setValue(null);
    }
  }

  keywordSelected($event: MatAutocompleteSelectedEvent) {
   const keyword = this.secondaryKeywordsSearchResult.filter(k => k.id === $event.option.value)[0];
   this.keywords.push(keyword);
   this.sKeywordCtrl.setValue('');
   this.keywordInput.nativeElement.value = '';
  }

  editKeyword(sKey: KeywordDetailsDto, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove secondary keyword if it no longer has a name
    if (!value) {
      this.removeKey(sKey);
      return;
    }

    const index = this.keywords.indexOf(sKey);
    if (index >= 0) {
      // this.secondaryKeywords[index] = value;
    }
  }

  removeKey(sKey: KeywordDetailsDto) {
    const indexOfKey = this.keywords.indexOf(sKey);
    if (indexOfKey >= 0)
      this.keywords.splice(indexOfKey, 1);
  }

  private filterResultList(result: KeywordDetailsDto[]): KeywordDetailsDto[] {
    for (let i = 0; i < this.keywords.length; i++) {
      const keyword = this.keywords[i];
      const index = result.findIndex(k => k.id === keyword.id);
      if (index >= 0) {
        result.splice(index, 1);
      }
    }

    return result;
  }
}
