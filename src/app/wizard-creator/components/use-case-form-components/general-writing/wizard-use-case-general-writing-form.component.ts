import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorCodingUseCasesEnum } from 'src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum';
import { WizardGeneralWritingUseCases } from 'src/app/wizard-creator/enums/wizard-creator-general-writing-use-cases.enum';
import { WizardCreatorService } from 'src/app/wizard-creator/services/wizard-creator.service';

@Component({
  selector: 'app-wizard-use-case-general-writing-form',
  templateUrl: './wizard-use-case-general-writing-form.component.html',
  styleUrls: ['./wizard-use-case-general-writing-form.component.scss']
})
export class WizardUseCaseGeneralWritingFormComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  userCase: WizardGeneralWritingUseCases;

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
    this._wizard.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$)).subscribe(useCase => {
      this.userCase = useCase as WizardGeneralWritingUseCases;
    })
  }

  public get wizardUseCase(): typeof WizardGeneralWritingUseCases {
    return WizardGeneralWritingUseCases;
  }
}
