import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SelectorFieldToRenderData } from 'src/app/common/interfaces/button-toggle-to-render-data';
import { CheckboxFieldToRenderData } from 'src/app/common/interfaces/checkbox-field-to-render-data';
import { TextFieldToRenderData } from 'src/app/common/interfaces/textfield-to-render-data';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';
import { WizardFormService } from 'src/app/wizard-creator/services/wizard-form.service';

@Component({
  selector: 'app-use-case-form-base',
  templateUrl: './use-case-form-base.component.html',
  styleUrls: ['./use-case-form-base.component.scss']
})
export abstract class UseCaseFormBaseComponent {

  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    public _wizardFormService: WizardFormService,
    private _wizardUseCaseService: WizardUseCaseService) {
  }

  ngOnInit(): void {
    this.setFieldsAndData();
    this.setListeners();
  }


  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete();
  }

  setListeners() {
    this._wizardFormService.buttonToggleUpdate$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(buttonToggleName => {
       this.toggleButtonUpdateActions(buttonToggleName);
      })
  }


  setFieldsAndData(): void {
    this.setSelectorFieldsData();
    this.setSelectorFieldsData();
    this.setButtonToggleData();
    this.setCheckboxFieldsData();
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

  
  public get textFieldsToRender() : TextFieldToRenderData[] {
    return this._wizardFormService.textFieldsToRender;
  }

  
  public get selectorFieldsToRender() : SelectorFieldToRenderData[] {
    return this._wizardFormService.selectorFieldsToRender;
  }

  public get checkboxFieldsToRender(): CheckboxFieldToRenderData[] {
    return this._wizardFormService.checkboxFieldsToRender;
  }
  
  
  abstract toggleButtonUpdateActions(buttonToggleName: string): void;

  abstract setTextFieldsData(): void;

  abstract setSelectorFieldsData(): void;

  abstract setButtonToggleData(): void;

  abstract setCheckboxFieldsData(): void;
}
