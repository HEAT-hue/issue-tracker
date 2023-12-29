'use server'
import prisma from "../../../prisma/client"
import { User } from "@prisma/client"

export async function fetchUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
    return users || [];
}