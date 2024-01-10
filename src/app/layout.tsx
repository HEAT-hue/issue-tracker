import QueryClientProvider from '@/QueryClientProvider';
import { auth } from '@/auth';
import { NavBar } from '@/components';
import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import './theme.config.css';
// Font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

// App meta data
export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'An app that helps to monitor and manage issues',
}

export default async function RootLayout({ children, }: {
  children: React.ReactNode
}) {

  // Get the current auth session
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.variable}>
        {/* Top Loader */}
        <NextTopLoader />
        {/* React Query Provider */}
        <QueryClientProvider>
          {/* Radix UI Theme */}
          <Theme>
            <NavBar session={session} />
            <main className='p-5'>
              <Container>
                {children}
              </Container>
            </main>
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  )
}
