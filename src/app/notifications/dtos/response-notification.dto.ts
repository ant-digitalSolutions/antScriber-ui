export class NotificationResponseDTO {
  readonly id: number;
  readonly title: string;
  readonly message: string;
  isRead: boolean;
  isSeen: boolean;
  readonly createdAt: Date;

  extendedDescription?: string;

  redirectUrlAfterClick?: string;
}
