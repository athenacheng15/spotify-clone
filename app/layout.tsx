import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import SupabaseProvider from '@/providers/supabase-provider';
import Sidebar from '@/components/sidebar';
import './globals.css';
import UserProvider from '@/providers/user-provider';
import ModalProvider from '@/providers/modal-provider';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'Listen to music!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={figtree.className}>
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <Sidebar>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
