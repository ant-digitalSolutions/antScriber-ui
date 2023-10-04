import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardGeneralWritingUseCases } from 'src/app/wizard-creator/enums/wizard-creator-general-writing-use-cases.enum';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';

@Component({
  selector: 'app-wizard-use-case-general-writing-form',
  templateUrl: './wizard-use-case-general-writing-form.component.html',
  styleUrls: ['./wizard-use-case-general-writing-form.component.scss']
})
export class WizardUseCaseGeneralWritingFormComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  userCase: WizardGeneralWritingUseCases;

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
      this.userCase = useCase as WizardGeneralWritingUseCases;
    })
  }

  public get wizardUseCase(): typeof WizardGeneralWritingUseCases {
    return WizardGeneralWritingUseCases;
  }
}
