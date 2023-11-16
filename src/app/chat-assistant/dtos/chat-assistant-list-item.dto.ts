
export class ChatAssistantListItemDto {
  uuid: string;
  
  openaiAssistantId: string;

  assistantName: string;

  photoUrl?: string;

  totalUses?: number;
  
  isSystemAssistant: boolean;
}
