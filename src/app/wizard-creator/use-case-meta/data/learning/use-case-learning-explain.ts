import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { WizardCreatorLearningUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-learning-use-cases.enum";

export class UseCase_Learning_Explain extends UseCaseMetaAbstract {




    constructor() {
        super();
        this.iconName = 'default';
        this.useCaseName = WizardCreatorLearningUseCasesEnum.Explain;
        this.useCaseGroup = WizardCreatorUseCaseGroup.Learning;
        this.isAvailable = true;
    }



    override setDefaultFieldsToUse(): void {
        this._wizardFormService.updateFormDefaultFieldsToRender([WizardDefaultFieldNamesEnum.ALL], 'add');
        this._wizardFormService.updateFormDefaultFieldsToRender([
            WizardDefaultFieldNamesEnum.VoiceTone, WizardDefaultFieldNamesEnum.AmountOfVariants], 'del');
    }
}
