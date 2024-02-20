'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

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
            <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex"></div>
        </div>
    );
};

export default Sidebar;
