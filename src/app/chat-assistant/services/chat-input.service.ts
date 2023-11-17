import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ChatInputService {

  chatInputRows = 1;

  _chatInputRowsEvent = new BehaviorSubject<string>('');
  chatInputRowsChanged = this._chatInputRowsEvent.asObservable();

  constructor() { }

  setChatInputRows(rows: number) {
    if (this.chatInputRows !== rows) {
      this.chatInputRows = rows;
      this._chatInputRowsEvent.next(this.chatInputHeight);
    }
  }

  
  public get chatInputHeight() : string {
    return `${this.chatInputRows * 20}px`
  }
  
}
