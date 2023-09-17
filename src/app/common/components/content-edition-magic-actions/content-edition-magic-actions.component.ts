import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MagicEditionService } from '../../services/content-magic-edition.service';
import { IRequestResponse } from '../../dto/request-response.dto';
import { MagicActionEnum } from '../../enum/content generation/magic-action.enum';

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

  editedContent: string | undefined;

  constructor(private magicEditionService: MagicEditionService) {

  }


  toggleShowAllButtons() {
    this.showAllButtons = !this.showAllButtons
  }

  applyMagicAction(action: MagicActionEnum): void {
    if (this.contentToEdit) {
      this.isLoading = true;
      this.applyingMagic.emit(true);
      const textToApplyMagic = this.editedContent ? this.editedContent : this.contentToEdit;
      this.magicEditionService.applyMagic(this.contentToEdit, action).subscribe(r => this.processMagicEditionResult(r))
    }
  }

  processMagicEditionResult(r: IRequestResponse<string>): void {
    this.isLoading = false;
    this.applyingMagic.emit(false);

    if (r.success) {
      this.editedContent = r.data;
    }
  }

  discardEditedContent() {
    this.editedContent = undefined;
  }
  saveEditedContent() {
    this.contentToEdit = this.editedContent;
    this.contentEditedEmitter.emit(this.contentToEdit);
    this.editedContent = undefined;
  }

  
  public get MagicActions() : typeof MagicActionEnum {
    return MagicActionEnum;
  }
  


}
