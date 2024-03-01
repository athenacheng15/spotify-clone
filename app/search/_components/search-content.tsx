'use client';

import type { Song } from '@/types';

import LikeButton from '@/components/likeButton';
import MediaItem from '@/components/media-item';
import useOnPlay from '@/hooks/useOnPlay';

interface SearchContentProps {
    songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
    const onPlay = useOnPlay(songs);

    if (!songs.length) {
        return (
            <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
                No songs found.
            </div>
        );
    }
    return (
        <div className="flex w-full flex-col gap-y-2 px-6">
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

export default SearchContent;
