import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { LoginResponse } from './lib/definitions';
import { z } from 'zod';

async function getUser(email: string, password: string): Promise<LoginResponse | undefined> {
    try {
        const user = {
            "userId": "8aa29f80-9a87-11ee-ae22-7733df6c64bc",
            "email": "onyejemeemmanuel65@gmail.com",
            "phoneNumber": "08164347354",
            "status": "ACTIVE",
            "hasPin": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYWNoZUtleSI6IjY1OGJiZjBlYzc4Y2I2OTM2NGQ3NTIyOCIsInVzZXIiOnsidXNlcklkIjoiOGFhMjlmODAtOWE4Ny0xMWVlLWFlMjItNzczM2RmNmM2NGJjIiwiZmlyc3RuYW1lIjoiRW1tYW51ZWwiLCJsYXN0bmFtZSI6Ik9ueWVqZW1lIiwiZW1haWwiOiJvbnllamVtZWVtbWFudWVsNjVAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwODE2NDM0NzM1NCIsIndhbGxldElkIjoiOGFhMjlmODEtOWE4Ny0xMWVlLWFlMjItNzczM2RmNmM2NGJjIiwiaXNWaXAiOmZhbHNlLCJsYXN0VmlwRGF0ZSI6bnVsbCwia3ljVmVyaWZpZWQiOnRydWV9LCJpYXQiOjE3MDM2NTcyMzAsImV4cCI6MTcwMzc0MzYzMH0.GoNMPL6fGtkqERfyEgr7g7S6qbq7BflHZpNNI__NhdE",
            "lastLogin": "2023-12-27T06:07:10.176Z",
            "kycVerified": true
        };
        return user
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    session: {
        strategy: 'jwt'
    },
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email, password);
                if (!user) {
                    return null;
                } else {
                    return { ...user, id: user.userId };
                }
            }
            return null;
        }
    })],

    callbacks: {
        // This is called when a user has successfully signed in.
        async jwt({ user, token, account }) {
            if (account && account.type == 'credentials') {
                token.userId = account.providerAccountId;
                token.access_token = user.token ?? 'no token';
                token.role = user?.role ?? "ACTIVE";
            }
            return token;
        },

        async session({ session, token }) {
            // After token is created
            // What you attach here is what you will get in any where session is required;
            session.user.role = (token as any).role
            session.user.token = token.access_token as string;
            return session;
        }
    }
});