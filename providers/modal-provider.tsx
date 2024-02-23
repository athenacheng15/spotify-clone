'use client';

import { useEffect, useState } from 'react';

import Modal from '@/components/modal';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // prevent hydration error -> to ensure modal load only when component is already rendered
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <Modal isOpen onChange={() => {}} title="Test" description="Desc">
                Children
            </Modal>
        </>
    );
};

export default ModalProvider;
