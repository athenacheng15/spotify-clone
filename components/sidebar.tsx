'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import Box from './box';
import SidebarItem from './sidebarItem';
import Library from './library';

interface SodebarProps {
    children: React.ReactNode;
}

const Sidebar = ({ children }: SodebarProps) => {
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                icon: HiHome,
                label: 'Home',
                activity: pathname !== '/search',
                href: '/',
            },
            {
                icon: BiSearch,
                label: 'Search',
                activity: pathname !== '/search',
                href: '/search',
            },
        ],
        [pathname],
    );

    return (
        <div className="flex h-full">
            <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map(item => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                <Box className="h-full overflow-y-auto">
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
};

export default Sidebar;
