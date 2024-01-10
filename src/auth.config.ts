import type { NextAuthConfig } from 'next-auth';

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
            // Checks if current user is logged in
            const isLoggedIn = !!auth?.user;
            
            // check if user is trying to access a protected route
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {

                // if true, grant access if user is logged in.
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {

                // If logged in however, return user to dashboard
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            // Allow access to other non protected routes
            return true;
        },
    },

    // Add providers
    providers: [],
} satisfies NextAuthConfig;