import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { messages } from './chat-data';
import { ContentCreationService } from '../content-creation.service';
import { ICompletionText } from '../dto/ICompletionText.dto';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  sidePanelOpened = true;
  msg = '';
  searchText: string = '';
  // MESSAGE
  selectedMessage: any;

  /**
   * Indicate there is a pending request to the server.
   *
   * @memberof ChatComponent
   */
  isLoading = false;

  public messages: Array<any> = messages;
  searchForm: any;
  // tslint:disable-next-line - Disables all
  // messages: Object[] = messages;

  constructor(private formBuilder: FormBuilder, private contentCreationService: ContentCreationService) {
    this.selectedMessage = this.messages[0];

    // search 
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }

  @ViewChild('myInput', { static: true }) myInput: ElementRef =
    Object.create(null);

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  // tslint:disable-next-line - Disables all
  onSelect(message: Object[]): void {
    this.selectedMessage = message;
  }

  /**
   * Get called when the user hit Enter or send the message.
   * 
   * Request to the server with the message from the user as a prompt.
   *
   * @memberof ChatComponent
   */
  OnAddMsg(): void {
    this.msg = this.myInput.nativeElement.value;
    this.isLoading = true;

    if (this.msg !== '') {
      this.selectedMessage.chat.push({
        type: 'even',
        msg: this.msg,
        date: new Date(),
      });

      const completionMessage: ICompletionText = {
        prompt: this.msg
      }
      this.contentCreationService.generateContentForChat(completionMessage).subscribe(result => {
        this.selectedMessage.chat.push({
          type: 'odd',
          msg: result.content,
          date: new Date()
        });
        this.isLoading = false;
      })
    }

    this.myInput.nativeElement.value = '';
  }
}
