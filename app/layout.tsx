import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import SupabaseProvider from '@/providers/supabase-provider';
import Sidebar from '@/components/sidebar';
import './globals.css';
import UserProvider from '@/providers/user-provider';
import ModalProvider from '@/providers/modal-provider';
import ToasterProvider from '@/providers/toaster-provider';
import getSongsByUserId from '@/actions/get-songs-by-user-id';
import Player from '@/components/player';
import getActiveProductsWithPrices from '@/actions/get-active-products-with-prices';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Spotify Clone',
    description: 'Listen to music!',
    icons: [{ url: '/logo.svg', href: '/logo.svg' }],
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userSongs = await getSongsByUserId();
    const products = await getActiveProductsWithPrices();
    return (
        <html lang="en">
            <body className={figtree.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider products={products} />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
