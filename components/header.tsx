'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

import Button from './button';
import { FaUserAlt } from 'react-icons/fa';
interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}
const Header = ({ children, className }: HeaderProps) => {
    const router = useRouter();
    const authModal = useAuthModal();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('logged out');
        }
    };

    return (
        <div
            className={twMerge(
                `h-fit bg-gradient-to-b from-emerald-800 p-6`,
                className,
            )}
        >
            <div className="mb-4 flex w-full items-center justify-between">
                <div className="hidden items-center gap-x-2 md:flex">
                    <button
                        onClick={router.back}
                        className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        onClick={router.forward}
                        className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="flex items-center gap-x-2 md:hidden">
                    <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex items-center justify-between gap-x-4">
                    {user ? (
                        <div className="flex items-center gap-x-4">
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-transparent font-medium text-neutral-300"
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-white px-6 py-2"
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
