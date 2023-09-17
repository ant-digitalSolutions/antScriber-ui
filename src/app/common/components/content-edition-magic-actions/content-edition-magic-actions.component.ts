import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MagicEditionService } from '../../services/content-magic-edition.service';
import { IRequestResponse } from '../../dto/request-response.dto';

@Component({
  selector: 'app-content-edition-magic-actions',
  templateUrl: './content-edition-magic-actions.component.html',
  styleUrls: ['./content-edition-magic-actions.component.scss']
})
export class ContentEditionMagicActionsComponent {

  showAllButtons = false;

  isLoading = false;

  @Output()
  contentEditedEmitter = new EventEmitter<string>();

  @Output()
  applyingMagic = new EventEmitter<boolean>();

  @Input()
  contentToEdit: string | undefined;

  constructor(private magicEditionService: MagicEditionService) {

  }


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
    if (this.contentToEdit)
      {
        this.isLoading = true;
        this.applyingMagic.emit(true);
        this.magicEditionService.improveText(this.contentToEdit).subscribe(r => this.processMagicEditionResult(r))
      }
  }

  processMagicEditionResult(r: IRequestResponse<string>): void {
    this.isLoading = false;
    this.applyingMagic.emit(false);

    if (r.success) {
      this.contentToEdit = r.data;
      this.contentEditedEmitter.emit(this.contentToEdit);
    }
  }


}
