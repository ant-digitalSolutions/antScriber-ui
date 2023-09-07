export class BlogProjectDetailsDto {
    constructor(init: Partial<BlogProjectDetailsDto>) {
        Object.assign(this, init);
    }

    title: string;

    description: string;

    url: string;

    readonly id: number;
}