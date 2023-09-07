export class BlogProjectCreateDto {
    constructor(init: Partial<BlogProjectCreateDto>) {
        Object.assign(this, init);
    }

    title: string;

    description: string;

    userName: string;

    applicationPassword: string;

    url: string;
}