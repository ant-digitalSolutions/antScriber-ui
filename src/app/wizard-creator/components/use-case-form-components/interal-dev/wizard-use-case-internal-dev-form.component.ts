import { Subject, takeUntil } from 'rxjs';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';
import { WizardCreatorInternalDevUseCasesEnum } from './../../../enums/wizard-creator-internal-dev-use-cases.enum';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard-use-case-internal-dev-form',
  templateUrl: './wizard-use-case-internal-dev-form.component.html',
  styleUrls: ['./wizard-use-case-internal-dev-form.component.scss']
})
export class WizardUseCaseInternalDevFormComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  userCase: WizardCreatorInternalDevUseCasesEnum;

  constructor(
    private _useCaseService: WizardUseCaseService) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
    this.setListeners();
  }

  setListeners() {
    this._useCaseService.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$)).subscribe(useCase => {
      this.userCase = useCase as WizardCreatorInternalDevUseCasesEnum;
    })
  }

  public get wizardUseCase(): typeof WizardCreatorInternalDevUseCasesEnum {
    return WizardCreatorInternalDevUseCasesEnum;
  }
}
