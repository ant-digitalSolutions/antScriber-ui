import { DocumentCreateDto } from './document-create.dto';

export class DocumentDetailsDto extends DocumentCreateDto {
  id: number;

  tags?: string;

  isFavorite: boolean;

  folderId: number;

  createdAt: Date;

  updatedAt: Date;
}
