'use client';

import type { ProductWithPrice } from '@/types';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/auth-modal';
import UploadModal from '@/components/upload-modal';
import SubscribeModal from '@/components/subscribe-modal';

interface ModalProviderProps {
    products: ProductWithPrice[];
}

const ModalProvider = ({ products }: ModalProviderProps) => {
    const [isMounted, setIsMounted] = useState(false);

    // prevent hydration error -> to ensure modal load only when component is already rendered
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
            <UploadModal />
            <SubscribeModal products={products} />
        </>
    );
};

export default ModalProvider;
