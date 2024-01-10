import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getAuthUser } from './lib/actions/authActions';
import bcrypt from 'bcrypt';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },

    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getAuthUser({ email });

                // No user found
                if (!user) return null;

                // Compare password
                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;
            }
            return null;
        }
    })],

    callbacks: {
        // This is called when a user has successfully signed in.
        async jwt({ user, token, account }) {
            if (account && account.type == 'credentials') {
                token.userId = account.providerAccountId;
                token.role = user?.role ?? "ACTIVE";
            }
            return token;
        },

        async session({ session, token }) {
            // After token is created
            // What you attach here is what you will get in any where session is required;
            session.user.role = (token as any).role
            return session;
        }
    }
});