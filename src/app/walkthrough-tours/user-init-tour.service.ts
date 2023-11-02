import { Injectable } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Subject } from 'rxjs';
import { WalkthroughTourIdEnum } from 'src/app/walkthrough-tours/enums/walktrough-tour-id.enum';
import { UserService } from '../user/services/user.service';
import { userInitializationShepherdStep_desktop, userInitializationShepherdStep_mobile, userInitializationTour_defaultStepOptions } from './configs/shepherd/shepherd-user-init.config';

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

  // id of the active tour
  tourId: string | undefined;

  constructor(
    private _shepherdService: ShepherdService,
    private _userService: UserService,
    protected $gaService: GoogleAnalyticsService
  ) {
  }

  initShepherd_userInitialization() {
    this.tourId = WalkthroughTourIdEnum.UserInitialization;
    this._shepherdService.defaultStepOptions = userInitializationTour_defaultStepOptions;
    this._shepherdService.modal = true;
    this._shepherdService.confirmCancel = false;

    const steps = window.innerWidth < 960 ? userInitializationShepherdStep_mobile : userInitializationShepherdStep_desktop;
    this._shepherdService.addSteps(steps);

    this.tour_userInitialization_events();

    this.start();
  }

  tour_userInitialization_events() {
    this._shepherdService.tourObject.on('show', () => {
      setTimeout(() => this.show(), 175)
    })

    this._shepherdService.tourObject.on('complete', () => {
      this._userService.initialWalkthroughCompleted();
      this.$gaService.event('walkthroughTour_user_init', 'tour_completed');
    })

    this._shepherdService.tourObject.on('cancel', () => {
      const currentStep = this._shepherdService.tourObject.getCurrentStep();

      if (currentStep) {
        const stepIndex = this._shepherdService.tourObject.steps.indexOf(currentStep);
        this.$gaService.event('walkthroughTour_user_init', 'tour_canceled', `step_${stepIndex}`);
      } else {
        this.$gaService.event('walkthroughTour_user_init', 'tour_canceled');
      }
    })

    this._shepherdService.tourObject.steps.forEach(step => {
      step.on('hide', () => this.shepherdHideEvent(step))
    });
  }

  start() {
    this._shepherdService.start();
    this.$gaService.event('walkthroughTour_user_init', 'tour_started');
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


  public get currentStepId(): string | undefined {
    return this._shepherdService.tourObject.getCurrentStep()?.id;
  }


  shepherdHideEvent(step: any) {
    this._shepherdHideStepSubject.next(step.id);
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
    progress.classList.add('shepherd-step-counter')
    // progress.style.marginRight = '315px';
    if (currentStep)
      progress.innerText = `${this._shepherdService.tourObject.steps.indexOf(currentStep) + 1}/${this._shepherdService.tourObject.steps.length}`;
    if (currentStepElement)
      footer?.insertBefore(progress, footer.querySelector('button'));
  }


}
