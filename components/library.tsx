'use client';

import type { Song } from '@/types';

import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUplaodModal from '@/hooks/useUploadModal';
import useOnPlay from '@/hooks/useOnPlay';

import MediaItem from './media-item';

interface LibraryProps {
    songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
    const authModal = useAuthModal();
    const uploadModal = useUplaodModal();
    const { user } = useUser();
    const onPlay = useOnPlay(songs);
    const onClick = () => {
        if (!user) return authModal.onOpen();

        // TODO chwnk for subscription
        return uploadModal.onOpen();
    };
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-md font-medium text-neutral-400">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="cursor-pointer text-neutral-400 transition hover:text-white"
                />
            </div>
            <div className="mt-4 flex flex-col gap-y-2 px-3">
                {songs.map(item => (
                    <MediaItem
                        key={item.id}
                        onClick={(id: string) => {
                            onPlay(id);
                        }}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
