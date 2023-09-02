import { assertInInjectionContext } from "@angular/core";

export class UserLogin {
    /**
     *
     */
    constructor(init?: Partial<UserLogin>) {
        Object.assign(this, init);
    }

    email?: string;

    password?: string;
}