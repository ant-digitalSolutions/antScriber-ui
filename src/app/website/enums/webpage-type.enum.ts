/**
 * Contains the different type of webpages to generate.
 *  This value will be use in the openAI prompt and in
 * the client side so the user select one when creating a page.
 *
 * @export
 * @enum {number}
 */
export enum WebpageType {
    Home = 'Home Page',
    ServicesMain = 'Services main page',
    ServiceDetails = 'Service Details',
    About = 'About Us',
    Contact = 'Contact Us',
    FAQ = 'FAQ',
    Privacy = 'Privacy',
}

export function getWebpageTypeStrings(): string[] {
    return Object.values(WebpageType);
}