import { Component, Input } from '@angular/core';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { WizardFormService } from '../../services/wizard-form.service';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { icons_getUrl } from 'src/app/common/configs/icon-name-url.config';

@Component({
  selector: 'app-wizard-use-cases-selector-by-group',
  templateUrl: './wizard-use-cases-selector-by-group.component.html',
  styleUrls: ['./wizard-use-cases-selector-by-group.component.scss']
})
export class WizardUseCasesSelectorByGroupComponent {


  @Input()
  useCases: OptionField<string>[];

  constructor(
    private _useCaseService: WizardUseCaseService,
    private _snackBar: MatSnackBar,) {

  }

  selectUseCase(useCase: string) {
    const useCaseMeta = this._useCaseService.useCaseMetaData(useCase);

    // TODO: check the subscription type of the current user.
    if (useCaseMeta.isAvailableForFreeUsers) 
      this._useCaseService.setWizardUseCase(useCase);
    else {
      this._snackBar.open('The selected useCase is only for Premium', undefined, {
        panelClass: 'use-case-for-premium-snack',
        duration: 2000
      })
    }
  }

  getIconUrl(useCase: string): string {
    const useCaseMeta = this._useCaseService.useCaseMetaData(useCase);
    return icons_getUrl(useCaseMeta.iconName);
  }

  isDisabled(useCase: string): boolean {
    const useCaseMeta = this._useCaseService.useCaseMetaData(useCase);
    return !useCaseMeta.isAvailableForFreeUsers;
  }

}
