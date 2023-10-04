import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-creator-selector-field',
  templateUrl: './wizard-creator-selector-field.component.html',
  styleUrls: ['./wizard-creator-selector-field.component.scss']
})
export class WizardCreatorSelectorFieldComponent {
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
    this.setListeners();

    this.form = new FormControl(this.fieldData.fieldValue)
    this.form.valueChanges.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(v => this.valueChange(v))
    this.valueChange(this.fieldData.fieldValue)
  }

  registerData() {
    this._wizardFormService.registerAdditionalDataFormField(this.fieldData.dataName, this.form);
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete();
    this._wizardFormService.removeFieldFromAdditionalData(this.fieldData.dataName);
  }

  setListeners() {

  }


  valueChange(value: any) {
    this._wizardFormService.updateAdditionalData(this.fieldData.dataName, this.form.value);
    this._wizardFormService.buttonToggleUpdate(this.fieldData.dataName);
  }
}
