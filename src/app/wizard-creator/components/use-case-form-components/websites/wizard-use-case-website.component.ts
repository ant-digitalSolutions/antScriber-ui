import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorWebsiteUseCasesEnum } from 'src/app/wizard-creator/enums/wizard-creator-website-use-cases.enum';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';

@Component({
  selector: 'app-wizard-use-case-website',
  templateUrl: './wizard-use-case-website.component.html',
  styleUrls: ['./wizard-use-case-website.component.scss']
})
export class WizardUseCaseWebsiteComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  useCase: WizardCreatorWebsiteUseCasesEnum;

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
      this.useCase = useCase as WizardCreatorWebsiteUseCasesEnum;
    })
  }

  public get wizardUseCase(): typeof WizardCreatorWebsiteUseCasesEnum {
    return WizardCreatorWebsiteUseCasesEnum;
  }
}
