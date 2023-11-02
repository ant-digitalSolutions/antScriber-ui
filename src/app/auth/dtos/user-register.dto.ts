
export class UserRegisterDto {
    /**
     *
     */
    constructor(init?: Partial<UserRegisterDto>) {
        Object.assign(this, init);
    }

    firstName: string;

    lastName?: string;

    email: string;

    password: string;

    registerCode: string;
}