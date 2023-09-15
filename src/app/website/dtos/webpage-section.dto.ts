export class WebpageSectionDto {
    constructor(init: Partial<WebpageSectionDto>) {
        Object.assign(this, init);
    }

    title: string;

    content?: string;

    summary: string;

    seoTitle?: string;

    status?: string;
}
