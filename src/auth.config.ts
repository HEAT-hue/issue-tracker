import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
    // Direct users to our sign in page
    pages: {
        signIn: '/login',
    },
    callbacks: {

        // Called before a request is completed
        /**
         * 
         * @auth Contians current user active session
         * @request Contains the incoming request 
         * @returns 
         */
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return false;
        },
    },

    // Add providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
} satisfies NextAuthConfig;