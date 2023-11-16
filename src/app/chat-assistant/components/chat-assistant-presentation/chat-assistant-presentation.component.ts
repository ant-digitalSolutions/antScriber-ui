import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChatAssistantDto } from '../../dtos/chat-assistant.dto';
import { ChatParamsEnum } from '../../enums/chat-route-params.enum';
import { ChatAssistantsService } from '../../services/chat-assistants.service';
import { ChatThreadsService } from '../../services/chat-threads.service';

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

  constructor(private _chatAssistantService: ChatAssistantsService,  private _route: ActivatedRoute, private _chatThreadService: ChatThreadsService) {}

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

    this._route.params
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((params) => {
      if (params) {
        if (params[ChatParamsEnum.AssistantId]) {
          this.isLoading = true;
          this._chatThreadService.setThreadId(undefined);
          this._chatAssistantService.setAssistantId(params[ChatParamsEnum.AssistantId])
          this._chatAssistantService.getAssistant().subscribe(() => {
            this.isLoading = false;
          })
        }
     
      }
    });
  }
}
