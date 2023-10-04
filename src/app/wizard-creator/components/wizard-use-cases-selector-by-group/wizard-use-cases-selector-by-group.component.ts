import { Component, Input } from '@angular/core';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { WizardFormService } from '../../services/wizard-form.service';

@Component({
  selector: 'app-wizard-use-cases-selector-by-group',
  templateUrl: './wizard-use-cases-selector-by-group.component.html',
  styleUrls: ['./wizard-use-cases-selector-by-group.component.scss']
})
export class WizardUseCasesSelectorByGroupComponent {


  @Input()
  useCases: OptionField<string>[];

  constructor(private _wizardService: WizardCreatorService, private _wizardForm: WizardFormService) {

  }

  selectUseCase(useCase: string) {
    this._wizardService.wizardUseCase = useCase;
    this._wizardForm.updateAdditionalData('useCase', useCase);
  }
}
