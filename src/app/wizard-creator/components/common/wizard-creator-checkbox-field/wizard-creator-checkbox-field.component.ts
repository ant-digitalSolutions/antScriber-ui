import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FloatLabelType } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-creator-checkbox-field',
  templateUrl: './wizard-creator-checkbox-field.component.html',
  styleUrls: ['./wizard-creator-checkbox-field.component.scss']
})
export class WizardCreatorCheckboxFieldComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  @Input()
  fieldData: CheckboxFieldToRenderData;

  isLoading = false;

  labelType: FloatLabelType = 'always';

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  checkBoxValue: boolean;

  constructor(
    private _wizardFormService: WizardFormService) {


  }

  ngOnInit(): void {
    this.setListeners();
    this.checkBoxValue = this.fieldData.fieldValue;
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    this._wizardFormService.removeFieldFromAdditionalData(this.fieldData.dataName);

  }

  setListeners() {
    this._wizardFormService.wizardFormFieldDataFromCache$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(data => {
        if (data.fieldName === this.fieldData.dataName) {
          this.fieldData.fieldValue = data.fieldValue;
          this.valueChange();
        }
      });

    this._wizardFormService.resetFieldsToDefault$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.checkBoxValue = this.fieldData.fieldValue
      });
  }


  valueChange() {
    this._wizardFormService.updateAdditionalData(this.fieldData.dataName, this.checkBoxValue);
  }
}
