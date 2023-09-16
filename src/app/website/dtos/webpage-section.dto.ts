export class WebpageSectionDto {
    constructor(init: Partial<WebpageSectionDto>) {
        Object.assign(this, init);
    }

    id: number;

    title: string;

    content?: string;

    summary: string;

    seoTitle?: string;

    status?: string;

    webpageId: string;
}
