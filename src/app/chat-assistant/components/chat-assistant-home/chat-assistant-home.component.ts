import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { ChatInputService } from '../../services/chat-input.service';

@Component({
  selector: 'app-chat-assistant-home',
  templateUrl: './chat-assistant-home.component.html',
  styleUrls: ['./chat-assistant-home.component.scss'],
})
export class ChatAssistantHomeComponent implements OnInit, AfterViewInit  {
  componentDestroyed$: Subject<boolean> = new Subject();

  isLoading = false;

  sidenavMode: MatDrawerMode = 'side'

  @ViewChild('mainContent') mainContent: ElementRef;


  constructor(
    private _chatInputService: ChatInputService,
  ) {
  }

  ngAfterViewInit(): void {
    this.setListeners();

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  setListeners() {
    this._chatInputService.chatInputRowsChanged.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(h => {
      this.adjustHeight(h);
    })
  }

  private adjustHeight(height: string): void {
    if (this.mainContent && this.mainContent.nativeElement) {
      const computedHeight = height.length === 0 ? `calc(100vh - 150px)` :  `calc(100vh - 130px - ${height})`;
     
      this.mainContent.nativeElement.style.height = computedHeight;
    }
  }

}
