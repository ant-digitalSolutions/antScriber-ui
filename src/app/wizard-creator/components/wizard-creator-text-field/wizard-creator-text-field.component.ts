import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { TextFieldToRenderData } from 'src/app/common/interfaces/field-to-render-data';
import { WizardCreatorService } from '../../services/wizard-creator.service';

@Component({
  selector: 'app-wizard-creator-text-field',
  templateUrl: './wizard-creator-text-field.component.html',
  styleUrls: ['./wizard-creator-text-field.component.scss']
})
export class WizardCreatorTextFieldComponent {

  @Input()
  fieldData: TextFieldToRenderData;

  isLoading = false;

  labelType: FloatLabelType = 'always';

  fieldForm: FormControl;

  @Output()
  valueEditedEvent = new EventEmitter<string>();

  constructor(private toastr: ToastrService, 
    private _wizardService: WizardCreatorService) {


  }

  ngOnInit(): void {
    this.fieldForm = new FormControl(this.fieldData.fieldValue, [...this.fieldData.validators])
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['fieldValue']) {
  //     this.isLoading = false;
  //   }
  // }


  saveEdition() {
    if (this.fieldForm.valid) {
      this.valueEditedEvent.emit(this.fieldForm.value);
      this._wizardService.updateAdditionalData(this.fieldData.dataName, this.fieldForm.value);
    } else {
      this.toastr.error('Please fix the errors')
    }
  }

  getErrorMessage() {
    if (this.fieldForm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.fieldForm.hasError('min')) {
      return 'The value is too short.';
    }
    if (this.fieldForm.hasError('minlength')) {
      return `Please, provide more context. The min length is: ${this.fieldForm.getError('minlength').requiredLength}`
    }
    if (this.fieldForm.hasError('maxlength')) {
      return `Your context is too long. The max length is: ${this.fieldForm.getError('maxlength').requiredLength}`

    }

    return 'There is an error in your input'
  }
}
