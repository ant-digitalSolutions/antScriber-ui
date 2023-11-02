import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { icons_getUrl } from 'src/app/common/configs/icon-name-url.config';
import { IUseCaseMeta } from '../../use-case-meta/use-case-meta.interface';
import { UserInitTourService } from 'src/app/walkthrough-tours/user-init-tour.service';
import { WalkthroughTourIdEnum } from 'src/app/walkthrough-tours/enums/walktrough-tour-id.enum';
import { Subject, takeUntil } from 'rxjs';
import { UserInitializationWalkthroughTourStepsEnum } from 'src/app/walkthrough-tours/enums/walkthrough-tour-user-initialization-steps-id.enum';
import { WizardSocialMediaUseCases } from '../../enums/wizard-creator-social-media-use-cases.enum';

@Component({
  selector: 'app-wizard-use-cases-selector-by-group',
  templateUrl: './wizard-use-cases-selector-by-group.component.html',
  styleUrls: ['./wizard-use-cases-selector-by-group.component.scss']
})
export class WizardUseCasesSelectorByGroupComponent implements OnDestroy, OnInit {


  @Input()
  useCases: IUseCaseMeta[];

  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private _useCaseService: WizardUseCaseService,
    private _snackBar: MatSnackBar,
    private _userInitTour: UserInitTourService
    ) {

  }

  ngOnInit(): void {
   this.setListeners();
  }


  setListeners() {
      this._userInitTour.walkthroughTouStepShowEvent$.pipe(takeUntil(this.componentDestroyed$), takeUntil(this._userInitTour.walkthroughTourEnded$))
        .subscribe(stepId => {
          if (stepId === UserInitializationWalkthroughTourStepsEnum.FillWizardFormFields) {
            const useCaseMeta = this.useCases.find(uc => uc.useCaseName === WizardSocialMediaUseCases.InstagramCaption);
            if (useCaseMeta) {
              this.selectUseCase(useCaseMeta);
            }
          }
        })
  }

  selectUseCase(useCaseMeta: IUseCaseMeta) {
    // const useCaseMeta = this._useCaseService.useCaseMetaData(useCase);

    // TODO: check the subscription type of the current user.
    if (useCaseMeta.isAvailable) { 
      this._useCaseService.setWizardUseCase(useCaseMeta.useCaseName); 
    }
    else {
      this._snackBar.open('The selected useCase is only for Premium', undefined, {
        panelClass: 'use-case-for-premium-snack',
        duration: 2000
      })
    }
  }

  getIconUrl(useCaseMeta: IUseCaseMeta): string {
    // const useCaseMeta = this._useCaseService.useCaseMetaData(useCase);
    return icons_getUrl(useCaseMeta.iconName);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
  }
}
