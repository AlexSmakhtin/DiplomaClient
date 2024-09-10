export type signInResponse = {
    id: string,
    name: string,
    email: string,
    jwtToken: string,
    status: number
}

export enum userStatus {
    common,
    premium
}