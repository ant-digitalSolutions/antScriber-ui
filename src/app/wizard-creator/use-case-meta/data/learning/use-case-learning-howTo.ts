import { WizardFormService } from "src/app/wizard-creator/services/wizard-form.service";
import { UseCaseMetaAbstract } from "../../use-case-meta.abastract";
import { Validators } from "ngx-editor";
import { TextFieldToRenderData } from "src/app/common/interfaces/textfield-to-render-data";
import { WizardCreatorUseCaseGroup } from "src/app/wizard-creator/enums/wizard-creator-use-case-group.enum";
import { WizardCreatorCodingUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-coding-use-cases.enum";
import { CheckboxFieldToRenderData } from "src/app/common/interfaces/checkbox-field-to-render-data";
import { WizardSocialMediaUseCases } from "src/app/wizard-creator/enums/wizard-creator-social-media-use-cases.enum";
import { SelectorFieldToRenderData } from "src/app/common/interfaces/button-toggle-to-render-data";
import { WizardDefaultFieldNamesEnum } from "src/app/wizard-creator/enums/wizard-default-fields-names.enum";
import { WizardCreatorLearningUseCasesEnum } from "src/app/wizard-creator/enums/wizard-creator-learning-use-cases.enum";

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
