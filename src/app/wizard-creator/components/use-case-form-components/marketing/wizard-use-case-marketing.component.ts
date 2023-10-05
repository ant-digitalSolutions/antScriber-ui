import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorMarketingUseCasesEnum } from 'src/app/wizard-creator/enums/wizard-creator-marketing-use-cases.enum';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';

@Component({
  selector: 'app-wizard-use-case-marketing',
  templateUrl: './wizard-use-case-marketing.component.html',
  styleUrls: ['./wizard-use-case-marketing.component.scss']
})
export class WizardUseCaseMarketingComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  useCase: WizardCreatorMarketingUseCasesEnum;

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
      this.useCase = useCase as WizardCreatorMarketingUseCasesEnum;
    })
  }

  public get wizardUseCase(): typeof WizardCreatorMarketingUseCasesEnum {
    return WizardCreatorMarketingUseCasesEnum;
  }
}
