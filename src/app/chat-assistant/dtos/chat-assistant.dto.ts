
export class ChatAssistantDto {
  uuid: string;
  
  openaiAssistantId: string;

  assistantName: string;

  photoUrl?: string;

  totalUses?: number;
  
  isSystemAssistant: boolean;
}
