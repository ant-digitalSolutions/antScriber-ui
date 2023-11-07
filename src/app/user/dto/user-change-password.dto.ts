export interface IUserChangePasswordDto {
    currentPassword: string;

    newPassword: string;

    userUUID?: string;
}