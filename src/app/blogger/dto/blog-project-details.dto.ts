export class BlogProjectDetailsDto {
    constructor(init: Partial<BlogProjectDetailsDto>) {
        Object.assign(this, init);
    }

    title: string;

    description: string;

    url: string;

    id: number;

    isDefaultProject: boolean;
}