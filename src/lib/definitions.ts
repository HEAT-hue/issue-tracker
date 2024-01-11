import { DefaultSession } from "next-auth";
import { Issue, Status } from "@prisma/client";

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

export enum Role {
    user = 'user',
    admin = 'admin'
}

// Augment the next auth module to modify session
declare module 'next-auth' {
    interface User {
        role?: Role;
    }

    interface Session extends DefaultSession {
        user: User
    }
}

// Table column type
export type TableColumn = { label: string, value: keyof Issue, className?: string }

// Issue status Map
export const statusMap: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'open', color: 'red' },
    IN_PROGRESS: { label: 'in progress', color: 'violet' },
    CLOSED: { label: 'closed', color: 'green' },
}