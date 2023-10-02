import { Component, OnDestroy, OnInit } from '@angular/core';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';

@Component({
  selector: 'app-wizard-creator-form-dynamic-elements',
  templateUrl: './wizard-creator-form-dynamic-elements.component.html',
  styleUrls: ['./wizard-creator-form-dynamic-elements.component.scss']
})
export class WizardCreatorFormDynamicElementsComponent implements OnDestroy, OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  userCaseGroup: WizardCreatorUseCaseGroup;

  userCase: string;

  componentToRender: Component;

  constructor(private _wizard: WizardCreatorService) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
    this.setListeners();
  }

  setListeners() {
    this._wizard.wizardUseCaseGroup$.pipe(takeUntil(this.componentDestroyed$)).subscribe(useCaseGroup => {
      this.userCaseGroup =useCaseGroup as WizardCreatorUseCaseGroup;
    })

    this._wizard.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$)).subscribe(useCase => {
      this.userCase = useCase;
    })
  }

  public get useCaseGroupEnum(): typeof WizardCreatorUseCaseGroup {
    return WizardCreatorUseCaseGroup;
  }

}
