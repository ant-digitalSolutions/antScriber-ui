import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorCodingUseCasesEnum } from 'src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';

@Component({
  selector: 'app-wizard-use-case-coding-home',
  templateUrl: './wizard-use-case-coding-home.component.html',
  styleUrls: ['./wizard-use-case-coding-home.component.scss']
})
export class WizardUseCaseCodingHomeComponent implements OnDestroy, OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();

  userCase: WizardCreatorCodingUseCasesEnum;

  constructor(
    private _useCaseService: WizardUseCaseService,
  ) {

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
      this.userCase = useCase as WizardCreatorCodingUseCasesEnum;
    })
  }

  public get wizardUseCase(): typeof WizardCreatorCodingUseCasesEnum {
    return WizardCreatorCodingUseCasesEnum;
  }

}