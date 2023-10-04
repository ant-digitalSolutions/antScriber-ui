import { Component, Input } from '@angular/core';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { WizardFormService } from '../../services/wizard-form.service';
import { WizardUseCaseService } from '../../services/use-case/wizard-use-case.service';

@Component({
  selector: 'app-wizard-use-cases-selector-by-group',
  templateUrl: './wizard-use-cases-selector-by-group.component.html',
  styleUrls: ['./wizard-use-cases-selector-by-group.component.scss']
})
export class WizardUseCasesSelectorByGroupComponent {


  @Input()
  useCases: OptionField<string>[];

  constructor(
    private _wizardService: WizardCreatorService, 
    private _wizardForm: WizardFormService,
    private _useCaseService: WizardUseCaseService) {

  }

  selectUseCase(useCase: string) {
    this._useCaseService.setWizardUseCase(useCase);
    this._wizardForm.updateAdditionalData('useCase', useCase);
  }
}
