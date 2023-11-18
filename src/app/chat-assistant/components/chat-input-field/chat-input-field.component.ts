import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatInputService } from '../../services/chat-input.service';
import { ChatThreadsService } from '../../services/chat-threads.service';

@Component({
  selector: 'app-chat-input-field',
  templateUrl: './chat-input-field.component.html',
  styleUrls: ['./chat-input-field.component.scss'],
})
export class ChatInputFieldComponent {
  newMessage: string = '';

  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  @ViewChild('inputRef') inputRef: ElementRef;

  constructor(
    private _chatAssistant: ChatThreadsService,
    private chatInputService: ChatInputService
  ) {}

  sendMessage(): void {
    this.isLoading = true;
    if (this.newMessage.trim()) {
      this._chatAssistant.sendMessage(this.newMessage.trim()).subscribe((r) => {
        if (r.success) {
        }
        this.isLoading = false;
      });

      this.newMessage = '';
    }
  }

  calculateRows(text: string): number {
    const textLength = text.length;
    const wordsPerRow = 80; // Adjust the number of words per row as needed
    const rows = Math.max(1, Math.ceil(textLength / wordsPerRow));

    this.chatInputService.setChatInputRows(rows);

    return rows;
  }

  checkInputHeight() {
    const textarea = this.inputRef.nativeElement;
    const currentRowCount = Math.floor(
      textarea.scrollHeight / parseFloat(getComputedStyle(textarea).lineHeight)
    );

    this.onRowChange(currentRowCount);
  }

  onRowChange(rowCounts: any) {
    this.chatInputService.setChatInputRows(rowCounts);
  }
}
