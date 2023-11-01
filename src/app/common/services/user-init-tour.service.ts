import { ShepherdService } from 'angular-shepherd';
import { Injectable } from '@angular/core';
import { defaultStepOptions, userInitializationShepherdStep_desktop, userInitializationShepherdStep_mobile } from '../configs/shepherd/shepherd-user-init.config';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInitTourService {

  /**
 * Emit the name of the field that contains an error.
 * The component that render the field should act.
 *
 * @private
 * @memberof WizardFormService
 */
  private _shepherdStepSubject = new Subject<string>();
  userInitTourStepEvent$ = this._shepherdStepSubject.asObservable();

  tourId: string | undefined;

  constructor(private _shepherdService: ShepherdService) {
    this.initShepherd_userInitialization();
  }

  initShepherd_userInitialization() {
    this._shepherdService.defaultStepOptions = defaultStepOptions;
    this._shepherdService.modal = true;
    this._shepherdService.confirmCancel = false;

    const steps = window.innerWidth < 960 ? userInitializationShepherdStep_mobile : userInitializationShepherdStep_desktop;
    this._shepherdService.addSteps(steps);

    this._shepherdService.tourObject.on('show', () => 
    {
      setTimeout(() => this.show(), 100)
      })

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


  show() {
    const currentStep = this._shepherdService.tourObject.getCurrentStep();

    const stepId = currentStep?.id;
    if (stepId)
      this._shepherdStepSubject.next(stepId);
    
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
