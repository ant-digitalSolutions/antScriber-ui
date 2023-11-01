import { WalkthroughTourIdEnum } from 'src/app/walkthrough-tours/enums/walktrough-tour-id.enum';
import { ShepherdService } from 'angular-shepherd';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { defaultStepOptions, userInitializationShepherdStep_mobile, userInitializationShepherdStep_desktop } from './configs/shepherd/shepherd-user-init.config';
import { UserInitializationWalkthroughTourStepsEnum } from './enums/walkthrough-tour-user-initialization-steps-id.enum';

@Injectable({
  providedIn: 'root'
})
export class UserInitTourService {

  // emit when Shepherd show a new modal
  private _shepherdShowStepSubject = new Subject<string>();
  walkthroughTouStepShowEvent$ = this._shepherdShowStepSubject.asObservable();

  // emit when Shepherd hides a modal
  private _shepherdHideStepSubject = new Subject<string>();
  walkthroughTouStepHideEvent$ = this._shepherdHideStepSubject.asObservable();

  // emit when the tour is completed
  private _walkthroughTourEnded = new Subject<void>();
  walkthroughTourEnded$ = this._walkthroughTourEnded.asObservable();

  tourId: string | undefined;

  constructor(private _shepherdService: ShepherdService) {
    // this.initShepherd_userInitialization();
  }

  initShepherd_userInitialization() {
    this.tourId = WalkthroughTourIdEnum.UserInitialization;
    this._shepherdService.defaultStepOptions = defaultStepOptions;
    this._shepherdService.modal = true;
    this._shepherdService.confirmCancel = false;

    const steps = window.innerWidth < 960 ? userInitializationShepherdStep_mobile : userInitializationShepherdStep_desktop;
    this._shepherdService.addSteps(steps);

    this._shepherdService.tourObject.on('show', () => {
      setTimeout(() => this.show(), 500)
    })

    this._shepherdService.tourObject.steps
    .find(s => s.id === UserInitializationWalkthroughTourStepsEnum.UnleashAssistant)?.on("hide", 
    () => this._shepherdHideStepSubject.next(UserInitializationWalkthroughTourStepsEnum.UnleashAssistant));

    this._shepherdService.tourObject.on('hide', () => {
      console.log('hide event');
      this.shepherdHideEvent()
    })

    this.start();

  }

  start() {
    this._shepherdService.start();

  }

  next() {
    this._shepherdService.next();
  }

  back() {
    this._shepherdService.back();
  }

  public get isActive(): boolean {
    return this._shepherdService.isActive;
  }


  public get shepherdService(): ShepherdService {
    return this._shepherdService;
  }

  shepherdHideEvent() {
    const currentStep = this._shepherdService.tourObject.getCurrentStep();

    const stepId = currentStep?.id;
    if (stepId)
      this._shepherdHideStepSubject.next(stepId);
  }

  show() {
    const currentStep = this._shepherdService.tourObject.getCurrentStep();

    const stepId = currentStep?.id;
    if (stepId)
      this._shepherdShowStepSubject.next(stepId);

    const currentStepElement = currentStep?.getElement();
    const footer = currentStepElement?.querySelector('.shepherd-footer');
    const progress = document.createElement('span');
    progress.style.alignSelf = 'center';
    progress.style.justifySelf = 'start';
    progress.style.width = '100%';
    // progress.style.marginRight = '315px';
    if (currentStep)
      progress.innerText = `${this._shepherdService.tourObject.steps.indexOf(currentStep) + 1}/${this._shepherdService.tourObject.steps.length}`;
    if (currentStepElement)
      footer?.insertBefore(progress, footer.querySelector('button'));
  }


}
