import { DocumentCreateDto } from './document-create.dto';

export class DocumentDetailsDto extends DocumentCreateDto {
  uuid: string;

  tags?: string;

  isFavorite: boolean;

  folderId: number;

  createdAt: Date;

  updatedAt: Date;
}
