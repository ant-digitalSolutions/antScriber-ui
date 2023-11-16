export interface ChatMessageDto {
  role: 'user' | 'assistant';

  message: string;

  threadId?: string;

  assistantId?: string;
}
