import { OptionField } from "src/app/common/dto/option-field.dto";

export class DialogCustomData_MoveDoc {
    folderOptions: OptionField<string>[];

    /**
     * Uuid of the selected folder.
     *
     * @type {string}
     * @memberof DialogCustomData_MoveDoc
     */
    selectedFolder: string;

    /**
     * The UUID of the document to be moved
     *
     * @type {string}
     * @memberof DialogCustomData_MoveDoc
     */
    docToMoveUUId: string;
}