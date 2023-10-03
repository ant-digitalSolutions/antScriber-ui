import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/field-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
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

  constructor(private toastr: ToastrService,
    private _wizardService: WizardCreatorService,
    private _wizardFormService: WizardFormService) {


  }

  ngOnInit(): void {
    this.setListeners();
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {

  }


  valueChange() {
    this._wizardService.updateAdditionalData(this.fieldData.dataName, this.fieldData.fieldValue);
  }
}
