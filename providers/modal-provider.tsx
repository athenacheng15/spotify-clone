'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/auth-modal';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // prevent hydration error -> to ensure modal load only when component is already rendered
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
        </>
    );
};

export default ModalProvider;
