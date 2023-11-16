import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChatAssistantDto } from '../../dtos/chat-assistant.dto';
import { ChatAssistantsService } from '../../services/chat-assistants.service';

@Component({
  selector: 'app-chat-assistant-presentation',
  templateUrl: './chat-assistant-presentation.component.html',
  styleUrls: ['./chat-assistant-presentation.component.scss'],
})
export class ChatAssistantPresentationComponent implements OnInit, OnChanges {
  @Input() assistantId: string;

  isLoading = true;

  assistantData: ChatAssistantDto;

  constructor(private _chatAssistantService: ChatAssistantsService) {}

  ngOnChanges(): void {
    this._chatAssistantService.getAssistant(this.assistantId).subscribe((r) => {
      if (r.success) {
        this.assistantData = r.data!;
      }

      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    
  }
}
