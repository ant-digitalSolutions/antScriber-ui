import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-creator-button-toggle',
  templateUrl: './wizard-creator-button-toggle.component.html',
  styleUrls: ['./wizard-creator-button-toggle.component.scss']
})
export class WizardCreatorButtonToggleComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  @Input()
  fieldData: SelectorFieldToRenderData;

  isLoading = false;

  labelType: FloatLabelType = 'always';

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  form: FormControl;

  constructor(
    private _wizardFormService: WizardFormService) {
  }

  ngOnInit(): void {

    this.form = new FormControl(this.fieldData.fieldValue);
    this.form.valueChanges.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(v => this.valueChange(v));

    this._wizardFormService.updateAdditionalData(this.fieldData.dataName, this.fieldData.fieldValue);
    this._wizardFormService.buttonToggleUpdate(this.fieldData.dataName);

  }

  setListeners() {
    this._wizardFormService.wizardFormFieldDataFromCache$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(data => {
        if (data.fieldName === this.fieldData.dataName) {
          this.valueChange(data.fieldValue);
        }
      });
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    this._wizardFormService.removeFieldFromAdditionalData(this.fieldData.dataName);
  }

  valueChange(value: any) {
    this._wizardFormService.updateAdditionalData(this.fieldData.dataName, value);
    this._wizardFormService.buttonToggleUpdate(this.fieldData.dataName);
  }
}
