'use client';

import type { Song } from '@/types';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import MediaItem from '@/components/media-item';
import LikeButton from '@/components/likeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
    songs: Song[];
}

const LikedContent = ({ songs }: LikedContentProps) => {
    const router = useRouter();
    const { user, isLoading } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, router, user]);

    if (!songs.length) {
        return (
            <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
                No liked songs.
            </div>
        );
    }
    return (
        <div className="flex w-full flex-col gap-y-2 p-6">
            {songs.map(song => (
                <div key={song.id} className="flex w-full items-center gap-x-4">
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => {
                                onPlay(id);
                            }}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
