import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'use-case-dynamic-form-elements',
  templateUrl: './use-case-dynamic-form-elements.component.html',
  styleUrls: ['./use-case-dynamic-form-elements.component.scss']
})
export class UseCaseDynamicFormElementsComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  appName = environment.appName;

  constructor(
    public _wizardFormService: WizardFormService) {
  }

  ngOnInit(): void {
    this.setListeners();
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete();
  }

  setListeners() {
    // this._wizardFormService.buttonToggleUpdate$.pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe(buttonToggleName => {
    //    this.toggleButtonUpdateActions(buttonToggleName);
    //   })
  }

  textFieldData(dataName: string): TextFieldToRenderData {
    const data = this._wizardFormService.textFieldsToRender.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  buttonToggleData(): SelectorFieldToRenderData | undefined {
    const data = this._wizardFormService.buttonToggleFieldToRender;

    if (data) {
      return data;
    } else {
      return undefined;
    }
  }

  checkBoxFieldData(dataName: string): CheckboxFieldToRenderData {
    const data = this._wizardFormService.checkboxFieldsToRender.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  selectorFieldData(dataName: string): SelectorFieldToRenderData {
    const data = this._wizardFormService.selectorFieldsToRender.find(d => d.dataName === dataName);

    if (data) {
      return data;
    } else {
      throw new Error(`The given dataName is not registered: ${dataName}`)
    }
  }

  checkIfFieldShouldRender(fieldName: string): boolean {
    return this._wizardFormService.checkIfFieldShouldRender(fieldName);
  }


  public get textFieldsToRender(): TextFieldToRenderData[] {
    return this._wizardFormService.textFieldsToRender;
  }


  public get selectorFieldsToRender(): SelectorFieldToRenderData[] {
    return this._wizardFormService.selectorFieldsToRender;
  }

  public get checkboxFieldsToRender(): CheckboxFieldToRenderData[] {
    return this._wizardFormService.checkboxFieldsToRender;
  }

}
