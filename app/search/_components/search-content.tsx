'use client';

import MediaItem from '@/components/media-item';
import { Song } from '@/types';

interface SearchContentProps {
    songs: Song[];
}

const SearchContent = ({ songs }: SearchContentProps) => {
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
                        <MediaItem onClick={() => {}} data={song} />
                    </div>
                    {/* TODO Add like button */}
                </div>
            ))}
        </div>
    );
};

export default SearchContent;
