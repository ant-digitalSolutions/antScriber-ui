import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WizardFormService {

  showDescriptionInput = true;

  showToneInput = true;

  showLangInput = true;

  showNumberOfVariantsToGenerate = true;

  showGptVersion = true;

  showCreativityInput = true;



  constructor() { }

  updateFieldsForCodingImplementCode() {
    this.showDescriptionInput = false;
    this.showToneInput = false;
    this.showLangInput = false;
    this.showNumberOfVariantsToGenerate = false;
  }
}
