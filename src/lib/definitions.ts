// type for nav links
export type NavLink = {
    label: string,
    href: string
}

export const DEFAULT_ERR_MSG = 'An error occurred!';

export type LoginResponse = {
    "userId": string,
    "email": string,
    "phoneNumber": string,
    "status": string,
    "hasPin": boolean,
    "token": string,
    "lastLogin": string,
    "kycVerified": boolean
}