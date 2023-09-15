/**
 * Contains the response from the server
 *
 * @export
 * @interface IRequestResponse
 * @template T
 */
export interface IRequestResponse<T> {
    success: boolean;

    message: string;

    data?: T;

    error?: any;
}
