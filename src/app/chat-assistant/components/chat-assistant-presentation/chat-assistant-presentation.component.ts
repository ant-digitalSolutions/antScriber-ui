import { Component, Input, OnInit } from '@angular/core';
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

  chatAssistant: ChatAssistantDto;

  constructor(private _chatAssistantService: ChatAssistantsService) {}

  ngOnInit(): void {
    this._chatAssistantService.getAssistant(this.assistantId).subscribe((r) => {
      if (r.success) {
        this.chatAssistant = r.data!;
      }

      this.isLoading = false;
    });
  }
}
