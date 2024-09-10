import {userStatus} from "./signInResponse.ts";

export type signUpRequest = {
    name: string,
    email: string,
    password: string,
    status: userStatus,
    birthday: Date
}