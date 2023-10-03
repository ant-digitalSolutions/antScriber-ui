import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { WizardCreatorService } from '../../services/wizard-creator.service';

@Component({
  selector: 'app-wizard-creator-home',
  templateUrl: './wizard-creator-home.component.html',
  styleUrls: ['./wizard-creator-home.component.scss']
})
export class WizardCreatorHomeComponent {
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private _wizard: WizardCreatorService) {

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
  }

  ngOnInit(): void {
    this.setListeners();
  }

  setListeners() {
    this._wizard.wizardCreatedContent$.pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        this.scrollToBottom();
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

}
