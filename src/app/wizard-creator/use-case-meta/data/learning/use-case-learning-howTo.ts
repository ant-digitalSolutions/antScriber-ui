import { WizardCreatorLearningUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-learning-use-cases.enum";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";

export class UseCase_Learning_HowTo extends UseCaseMetaAbstract {




    constructor() {
        super();
        this.iconName = 'default';
        this.useCaseName = WizardCreatorLearningUseCasesEnum.HowTo;
        this.useCaseGroup = WizardCreatorUseCaseGroup.Learning;
        this.isAvailable = true;
    }



    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.VoiceTone, WizardDefaultFieldNamesEnum.AmountOfVariants], 'del');
    }
}
