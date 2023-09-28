export class DocumentCreateDto {
  constructor(init: Partial<DocumentCreateDto>) {
    Object.assign(this, init);
  }
  
  name: string;

  content: string;

  blogProjectId: number;

  folderUUId?: string;
}
