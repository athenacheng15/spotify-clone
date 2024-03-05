'use client';

import type { Song } from '@/types';

import Image from 'next/image';

import useLoadImage from '@/hooks/useLoadImage';
import usePlayer from '@/hooks/usePlayer';

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem = ({ data, onClick }: MediaItemProps) => {
    const player = usePlayer();
    const imageUrl = useLoadImage(data);
    const handleClick = () => {
        if (onClick) return onClick(data.id);
        return player.setId(data.id);
    };
    return (
        <div
            onClick={handleClick}
            className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
        >
            <div className="relative min-h-12 min-w-12 overflow-hidden rounded-md">
                <Image
                    fill
                    src={imageUrl || '/images/liked.png'}
                    alt="Media Item"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="truncate text-white">{data.title}</p>
                <p className="truncate text-sm text-neutral-400">
                    By {data.author}
                </p>
            </div>
        </div>
    );
};

export default MediaItem;
