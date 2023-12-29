'use server';
import { signIn, signOut } from '@/auth';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import prisma from '../../../prisma/client';
import { CreateUserSchema } from '../validationSchemas';
const bcrypt = require('bcrypt');

export async function createUser(
    prevState: string | undefined,
    formData: FormData,
) {

    try {
        // Extract user detials and parse for errors
        const { name, email, password } = CreateUserSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        // if successful, hash user password
        const hashedPassword: string = await bcrypt.hash(password, 10);

        // Create a new user
        await prisma.user.create({ data: { name, email, password: hashedPassword } });

    } catch (error) {

        if (error instanceof ZodError) {
            // Return first error message
            return error.issues[0].message;
        }

        // Prisma error when creating user
        if (error instanceof PrismaClientKnownRequestError) {
            // User already exits
            if (error.code == 'P2002') {
                return 'User already exists';
            }

            return 'An error occurred!'
        }

        return 'An error occurred!'
    }

    // redirect back to login
    redirect("/login")
}

export async function getAuthUser({ email }: { email: string; }): Promise<User | undefined> {
    // Insert the issue in database
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        // user found, return user
        if (user) {
            return user;
        }

    } catch (error) {
        console.log(error);
        if (error instanceof PrismaClientKnownRequestError) {
            const errorMessage = error.meta?.cause as string;
            console.log(errorMessage);
            throw new Error(errorMessage);
        }
        throw new Error("Oops! An error occured");
    }
}

// Sign in user
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signOutUser() {
    await signOut();
}
