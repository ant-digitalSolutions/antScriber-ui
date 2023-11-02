import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { KeywordDetailsDto } from '../../blogger/dto/keywords/keyword-details.dto';
import { KeywordsService } from '../../blogger/services/keywords.service';

@Component({
  selector: 'app-primary-keyword-selector',
  templateUrl: './primary-keyword-selector.component.html',
  styleUrls: ['./primary-keyword-selector.component.scss']
})
export class PrimaryKeywordSelectorComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();
  inputCtrl = new FormControl();

  primaryKeywordsSearchResult: KeywordDetailsDto[];

  primaryKeyword: string;

  @ViewChild('keywordInput', { static: false }) keywordInput: ElementRef<HTMLInputElement>;

  constructor(private keywordService: KeywordsService) {

  }

  ngOnInit(): void {
    this.keywordService.keywordSearchResult$.pipe(takeUntil(this.componentDestroyed$)).subscribe(keywords => {
      this.primaryKeywordsSearchResult = keywords;
    })

    this.inputCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.keywordService.listKeywordsByTerm(query))
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  keywordSelected($event: MatAutocompleteSelectedEvent) {
    const keyword = this.primaryKeywordsSearchResult.filter(k => k.name === $event.option.value)[0];
    this.primaryKeyword = keyword.name;
    this.inputCtrl.setValue(keyword.name)
    this.keywordService.setPrimaryKeywordForArticleEdition(keyword);
    console.log(`Primary Key Setted: ${keyword}`)
    // this.keywordsService.addSecondaryKeywordForArticleEdition(keyword);
    // this.inputCtrl.setValue('');
    // this.keywordInput.nativeElement.value = '';
  }


  addNewPrimaryKeyword() {
    const value = this.inputCtrl.value;
    if ((value || '').trim()) {
      const newKeyword: KeywordDetailsDto = {
        name: value,
        id: -1
      }
      this.keywordService.setPrimaryKeywordForArticleEdition(newKeyword);
      console.log(`Primary Key Setted: ${newKeyword}`)

      // this.keywordsService.addSecondaryKeywordForArticleEdition(newKeyword);
    }
  }

}


