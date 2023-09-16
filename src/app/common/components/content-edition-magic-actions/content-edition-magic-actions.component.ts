import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-content-edition-magic-actions',
  templateUrl: './content-edition-magic-actions.component.html',
  styleUrls: ['./content-edition-magic-actions.component.scss']
})
export class ContentEditionMagicActionsComponent {

  showAllButtons = false;

  toggleShowAllButtons() {
    this.showAllButtons = !this.showAllButtons
  }
  shortenIt() {
    throw new Error('Method not implemented.');
  }
  makeItAssertive() {
    throw new Error('Method not implemented.');
  }
  makeItPersuasive() {
    throw new Error('Method not implemented.');
  }
  makeItEngaging() {
    throw new Error('Method not implemented.');
  }
  makeItObjective() {
    throw new Error('Method not implemented.');
  }
  soundFluent() {
    throw new Error('Method not implemented.');
  }
  paraphraseIt() {
    throw new Error('Method not implemented.');
  }
  fixMistakes() {
    throw new Error('Method not implemented.');
  }
  moreInformative() {
    throw new Error('Method not implemented.');
  }
  simplifyIt() {
    throw new Error('Method not implemented.');
  }
  moreDetailed() {
    throw new Error('Method not implemented.');
  }
  moreDescriptive() {
    throw new Error('Method not implemented.');
  }
  improveIt() {
    throw new Error('Method not implemented.');
  }

  @Output()
  contentEditedEmitter = new EventEmitter<string>();

  @Input()
  contentToEdit: string | undefined;
}
