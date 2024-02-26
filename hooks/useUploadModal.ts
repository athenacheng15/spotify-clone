import { create } from 'zustand';

interface UploadModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUplaodModal = create<UploadModalStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUplaodModal;
