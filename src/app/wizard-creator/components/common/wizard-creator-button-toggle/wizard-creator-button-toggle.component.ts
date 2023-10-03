import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ButtonToggleToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-wizard-creator-button-toggle',
  templateUrl: './wizard-creator-button-toggle.component.html',
  styleUrls: ['./wizard-creator-button-toggle.component.scss']
})
export class WizardCreatorButtonToggleComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  @Input()
  fieldData: ButtonToggleToRenderData;

  isLoading = false;

  labelType: FloatLabelType = 'always';

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  form: FormGroup;

  constructor(private toastr: ToastrService,
    private _wizardService: WizardCreatorService,
    private _wizardFormService: WizardFormService) {
  }

  ngOnInit(): void {
    this.setListeners();

    this.form = new FormGroup({
      value: new FormControl(this.fieldData.fieldValue)
    })
    this.valueChange()
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {

  }


  valueChange() {
    const value = this.form.get('value')?.value;
    this._wizardFormService.updateAdditionalData(this.fieldData.dataName, value);
    this._wizardFormService.buttonToggleUpdate(this.fieldData.dataName);
  }
}
