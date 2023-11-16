import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-assistant-home',
  templateUrl: './chat-assistant-home.component.html',
  styleUrls: ['./chat-assistant-home.component.scss'],
})
export class ChatAssistantHomeComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  constructor(
  ) {}

  ngOnInit(): void {
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  setListeners() {
 
  }

}
