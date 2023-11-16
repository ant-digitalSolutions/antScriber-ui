import { ChatAssistantListItemDto } from "./chat-assistant-list-item.dto";

export class ChatAssistantDto extends ChatAssistantListItemDto {
  description: string;

  conversationStarters: string;

  isPublic: boolean;

  status: string;

  // indicate if the current user is the owner/creator of the assistant
  belongsToUser: boolean;
}
