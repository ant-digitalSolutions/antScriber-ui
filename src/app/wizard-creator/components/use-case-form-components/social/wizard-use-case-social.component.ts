import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardSocialMediaUseCases } from 'src/app/wizard-creator/enums/wizard-creator-social-media-use-cases.enum';
import { WizardUseCaseService } from 'src/app/wizard-creator/services/use-case/wizard-use-case.service';

@Component({
  selector: 'app-wizard-use-case-social',
  templateUrl: './wizard-use-case-social.component.html',
  styleUrls: ['./wizard-use-case-social.component.scss']
})
export class WizardUseCaseSocialComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  useCase: WizardSocialMediaUseCases;

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
      this.useCase = useCase as WizardSocialMediaUseCases;
    })
  }

  public get wizardUseCase(): typeof WizardSocialMediaUseCases {
    return WizardSocialMediaUseCases;
  }
}
