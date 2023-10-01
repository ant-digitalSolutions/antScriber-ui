import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { OptionField } from 'src/app/common/dto/option-field.dto';
import { mapEnumNameAndValue } from 'src/app/common/functions/name-and-values-of-enum.function';
import { WizardCreatorUseCaseGroup } from '../../enums/wizard-creator-use-case-group.enum';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { WizardGeneralWritingUseCases } from '../../enums/wizard-creator-general-writing-use-cases.enum';
import { WizardSocialMediaUseCases } from '../../enums/wizard-creator-social-media-use-cases.enum';
import { WizardBlogAndArticlesUseCases } from '../../enums/wizard-creator-blog-and-articles-use-cases.enum';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { F } from '@angular/cdk/keycodes';
import { WizardCreatorEcommerceUseCasesEnum } from '../../enums/wizard-creator-ecommerce-use-cases.enum';
import { WizardCreatorMarketingUseCasesEnum } from '../../enums/wizard-creator-marketing-use-cases.enum';
import { WizardCreatorCodingUseCasesEnum } from '../../enums/wizard-creator-coding-use-cases.enum';
import { WizardCreatorInternalDevUseCasesEnum } from '../../enums/wizard-creator-internal-dev-use-cases.enum';
import { WizardCreatorLearningUseCasesEnum } from '../../enums/wizard-creator-learning-use-cases.enum';

@Component({
  selector: 'app-wizard-use-cases-selector-home',
  templateUrl: './wizard-use-cases-selector-home.component.html',
  styleUrls: ['./wizard-use-cases-selector-home.component.scss']
})
export class WizardUseCasesSelectorHomeComponent implements OnInit, OnDestroy {


  showUseCases = false;


  /**
   * Indicate if the use group in the index `i` is open or closed
   *
   * @type {boolean[]}
   * @memberof WizardUseCasesSelectorHomeComponent
   */
  groupState: boolean[] = [];

  componentDestroyed$: Subject<boolean> = new Subject();

  useCasesGroups: OptionField<WizardCreatorUseCaseGroup>[];

  selectGroupUseCases: OptionField<string>[];

  selectedCase = 'Select the Use Case';

  showLoadMoreUseCasesBtn = true;

  constructor(private _wizardService: WizardCreatorService) {

  }

  ngOnInit(): void {
    this.setUseCases()
    this.setListeners()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  setListeners() {
    this._wizardService.wizardUseCase$.pipe(takeUntil(this.componentDestroyed$)).subscribe(useCase => {
      this.selectedCase = useCase;
      this.showUseCases = false;
    })
  }

  setUseCases(initialElements: boolean = true) {
   const values = mapEnumNameAndValue(WizardCreatorUseCaseGroup);
    this.useCasesGroups = initialElements ? values.slice(0,3) : values;

    if(!initialElements) {
      this.showLoadMoreUseCasesBtn = false;
    }
  }



  selectUseCaseGroup(selectedGroup: string, isOpen: boolean) {
   this._wizardService.wizardUseCaseGroup = selectedGroup;
    switch (selectedGroup) {
      case WizardCreatorUseCaseGroup.GeneralWriting:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardGeneralWritingUseCases);
        break;
      case WizardCreatorUseCaseGroup.SocialMedia:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardSocialMediaUseCases);
        break;
      case WizardCreatorUseCaseGroup.ArticlesAndBlog:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardBlogAndArticlesUseCases);
        break;
      case WizardCreatorUseCaseGroup.Ecommerce:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorEcommerceUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.AdsAndMarketing:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorMarketingUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.Coding:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorCodingUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.InternalDev:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorInternalDevUseCasesEnum);
        break;
      case WizardCreatorUseCaseGroup.Learning:
        this.selectGroupUseCases = mapEnumNameAndValue(WizardCreatorLearningUseCasesEnum);
        break;

      default:
        break;
    }
  }

  toggleUseCases() {
    this.showUseCases = !this.showUseCases;
  }
}
