import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatAssistantDto } from '../../dtos/chat-assistant.dto';
import { ChatAssistantsService } from '../../services/chat-assistants.service';

@Component({
  selector: 'app-chat-assistant-presentation',
  templateUrl: './chat-assistant-presentation.component.html',
  styleUrls: ['./chat-assistant-presentation.component.scss'],
})
export class ChatAssistantPresentationComponent implements OnInit {
  @Input() assistantId: string;

  isLoading = true;

  assistantData: ChatAssistantDto;

  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private _chatAssistantService: ChatAssistantsService) {}

  ngOnInit(): void {
    this.setListeners()
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  setListeners() {
    this._chatAssistantService.selectedAssistantDataObservable$.pipe(takeUntil(this.componentDestroyed$))
    .subscribe(assistant => {
      if (assistant) {
        this.assistantData = assistant;
      }
      this.isLoading = false;
    })
  }
}
