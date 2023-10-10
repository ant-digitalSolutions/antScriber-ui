import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorService } from '../../services/wizard-creator.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-wizard-creator-home',
  templateUrl: './wizard-creator-home.component.html',
  styleUrls: ['./wizard-creator-home.component.scss']
})
export class WizardCreatorHomeComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  isMobile = false;

  selectedTabIndex = 0;

  constructor(
    private _wizard: WizardCreatorService,
    private breakpointObserver: BreakpointObserver) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {

    this.setListeners();
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile.bind(this), false)
  }

  setListeners() {
    this._wizard.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        if (this.isMobile) {
          this.selectedTabIndex = 1;
        }
      })
  }

  scrollToBottom(): void {
    try {
      const wizardContent = document.querySelector('.wizard-content');
      wizardContent!.scrollTop = wizardContent!.scrollHeight;
    } catch (err) {
      console.error(`Error Scrolling the content: ${err}`)
    }
  }

  checkIfMobile() {
    this.isMobile = (window.innerWidth < 960);
  }

}
