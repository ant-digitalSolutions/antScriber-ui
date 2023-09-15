import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryKeywordsSelectorComponent } from './components/keywords-selector/secondary-keywords-selector.component';
import { PrimaryKeywordSelectorComponent } from './primary-keyword-selector/primary-keyword-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MaterialModule } from '../material.module';
import { KeywordsService } from '../blogger/services/keywords.service';



@NgModule({
  declarations: [SecondaryKeywordsSelectorComponent, PrimaryKeywordSelectorComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  exports: [SecondaryKeywordsSelectorComponent, PrimaryKeywordSelectorComponent],
  providers: [KeywordsService]
})
export class KeywordsModule { }
