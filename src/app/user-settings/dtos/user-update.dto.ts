export interface IUserUpdateDto {
    userUUID?: string;

    firstName: string;

    lastName: string;

    company?: string;

    companyRole?: string;
}