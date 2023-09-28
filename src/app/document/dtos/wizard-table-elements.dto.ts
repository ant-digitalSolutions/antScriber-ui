import { DocumentDetailsDto } from "./document-details.dto";
import { FolderDetailsDto } from "./folder-details.dto";

export interface WizardTableElements {
    documents: DocumentDetailsDto[];

    folders: FolderDetailsDto[];

    /**
     * IF the user has selected a folder, then this property
     * contains the data related to the folder.
     *
     * @type {FolderDetailsDto}
     * @memberof WizardTableElements
     */
    folderData?: FolderDetailsDto;
}