export interface WizardTableElement {
    name: string;

    documentsCount?: number;

    /**
     * True if the current element represents a Document; otherwise false.
     *
     * @type {boolean}
     * @memberof WizardTableElement
     */
    isDocument: boolean;

    updatedAt: Date;

    wordsCount?: number;

    uuid: string;

    isFavorite?: boolean;
}